import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

export type MultipleSmsType = {
  id: string;
  message: string;
  phone: string; 
};

@Injectable()
export class SmsService {
  constructor(private prisma: PrismaService) {}

  
  private readonly singleSmsUrl = 'https://api.negarit.net/api/api_request/sent_message';
  private readonly bulkSms = "https://api.negarit.net/api/api_request/sent_multiple_messages";
  private readonly allMessages = "https://api.negarit.net/api/api_request/received_messages";

  async sendSms(apiKey: string, sentTo: string, message: string, campaignId: string): Promise<any> {
    try {
      const url = `${this.singleSmsUrl}?API_KEY=${apiKey}`;
      const payload = {
        API_KEY: apiKey,
        sent_to: sentTo,
        message: message,
        campaign_id: campaignId,
      };

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to send SMS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async sendMultipleSms(apiKey: string, data: MultipleSmsType[], campaign_id: string): Promise<any> {
    try {
      const url = `${this.bulkSms}?API_KEY=${apiKey}`;

      const payload = {
        apiKey: apiKey,
        campaign_id: campaign_id,
        messages: data
      };
      

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to send SMS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async SubscribeUser(apiKey: string): Promise<any> {
    try {
      const url = `${this.allMessages}?API_KEY=${apiKey}`;

      const response = await axios.get(url);

      await Promise.all(
        response.data.received_messages.map(async (item: { message: string; sent_from: any }) => {
          if (item.message.toLocaleLowerCase() === "okk") {
            // Check if the 'sent_from' already exists
            const existingRecord = await this.prisma.contactGroup.findUnique({
              where: {
                address: item.sent_from,
              },
            });
      
            // If it doesn't exist, create a new record
            if (!existingRecord) {
              await this.prisma.contactGroup.create({
                data: {
                  groupId: "1",
                  address: item.sent_from,
                },
              });
            }
          }
        })
      );      
      


      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to send SMS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async UnsubscribeUser(apiKey: string): Promise<any> {
    try {
      const url = `${this.allMessages}?API_KEY=${apiKey}`;

      const response = await axios.get(url);

      await Promise.all(
        response.data.received_messages.map(async (item: { message: string; sent_from: any }) => {
          if (item.message.toLocaleLowerCase() === "koo") {
            // Check if the 'sent_from' already exists
            const existingRecord = await this.prisma.contactGroup.findUnique({
              where: {
                address: item.sent_from,
              },
            });
      
            // If it doesn't exist, create a new record
            if (existingRecord) {
              await this.prisma.contactGroup.delete({
                where: {
                  address: item.sent_from
                }
              })
            }
          }
        })
      );      
      


      return response.data;
    } catch (error) {
      console.error('Error removing User:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to send SMS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async CreateGroup(name: string): Promise<any> {
    try {
      const existingGroup = await this.prisma.group.findMany({
        where: {
          name: name
        }
      });

      if(!existingGroup) {
        await this.prisma.group.create({
          data: {
            name: name
          }
        })
      };

      return { message: "Group Created!" }
    } catch(error) {
      console.error('Error creating Group:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Failed to send SMS',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}


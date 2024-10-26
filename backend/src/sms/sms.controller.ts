import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { MultipleSmsType, SmsService } from './sms.service';
import { AxiosRequestConfig } from 'axios';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) { }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendSms(
    @Body('apiKey') apiKey: string,
    @Body('sentTo') sentTo: string,
    @Body('message') message: string,
    @Body('campaignId') campaignId: string,
  ) {
    return this.smsService.sendSms(apiKey, sentTo, message, campaignId);
  }

  @Post('send-multiple')
  @HttpCode(HttpStatus.OK)
  async senMultipleSms(
    @Body('apiKey') apiKey: string,
    @Body('messages') data: MultipleSmsType[],
    @Body('campaignId') campaignId: string,
  ) {
    return this.smsService.sendMultipleSms(apiKey, data, campaignId);
  }

  @Get('all-messages')
  @HttpCode(HttpStatus.OK)
  async getAllMessages(
    @Body('apiKey') apiKey: string
  ) {
     return this.smsService.GetAllMessages(apiKey);
  }

  @Get('subscribe-users')
  @HttpCode(HttpStatus.OK)
  async subscribeUsers(
    @Body('apiKey') apiKey: string
  ) {
     return this.smsService.SubscribeUser(apiKey);
  }

  @Post('create-group')
  @HttpCode(HttpStatus.OK)
  async createGroup(
    @Body('name') name: string
  ) {
    return this.smsService.CreateGroup(name);
  }
}

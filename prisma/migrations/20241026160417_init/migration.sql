/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `ContactGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscribe_code]` on the table `PortContent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unsubscribe_code]` on the table `PortContent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactGroup_address_key" ON "ContactGroup"("address");

-- CreateIndex
CREATE UNIQUE INDEX "PortContent_subscribe_code_key" ON "PortContent"("subscribe_code");

-- CreateIndex
CREATE UNIQUE INDEX "PortContent_unsubscribe_code_key" ON "PortContent"("unsubscribe_code");

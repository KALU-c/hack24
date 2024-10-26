-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortContent" (
    "id" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "subscribe_code" TEXT NOT NULL,
    "unsubscribe_code" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "PortContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactGroup" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "ContactGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortContent" ADD CONSTRAINT "PortContent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactGroup" ADD CONSTRAINT "ContactGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

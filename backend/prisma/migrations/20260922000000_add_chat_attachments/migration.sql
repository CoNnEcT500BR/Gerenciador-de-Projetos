CREATE TABLE `Attachment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `originalName` VARCHAR(255) NOT NULL,
  `storedName` VARCHAR(191) NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL,
  `size` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `projectId` INTEGER NOT NULL,
  `messageId` INTEGER NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `Attachment_storedName_key`(`storedName`),
  UNIQUE INDEX `Attachment_messageId_key`(`messageId`),
  PRIMARY KEY (`id`),
  CONSTRAINT `Attachment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Attachment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Attachment_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

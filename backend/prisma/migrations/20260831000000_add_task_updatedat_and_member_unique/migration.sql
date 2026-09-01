-- AlterTable (Project)
ALTER TABLE `project` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable (Task)
ALTER TABLE `task` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex (ProjectMember unique userId+projectId)
CREATE UNIQUE INDEX `ProjectMember_userId_projectId_key` ON `projectmember`(`userId`, `projectId`);

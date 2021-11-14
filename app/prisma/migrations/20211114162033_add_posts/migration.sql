/*
  Warnings:

  - You are about to drop the column `permissionId` on the `UserPermission` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permission` to the `UserPermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserPermission` DROP FOREIGN KEY `UserPermission_permissionId_fkey`;

-- AlterTable
ALTER TABLE `UserPermission` DROP COLUMN `permissionId`,
    ADD COLUMN `permission` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Permission`;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

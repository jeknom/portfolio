-- AlterTable
ALTER TABLE `ContactInformation` ADD COLUMN `imageId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ContactInformation` ADD CONSTRAINT `ContactInformation_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

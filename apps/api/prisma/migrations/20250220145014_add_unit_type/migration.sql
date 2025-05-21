-- AlterTable
ALTER TABLE `producto` ADD COLUMN `unit` ENUM('KG', 'UNIT', 'PACK') NOT NULL DEFAULT 'UNIT';

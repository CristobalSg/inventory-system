/*
  Warnings:

  - You are about to drop the column `precio` on the `producto` table. All the data in the column will be lost.
  - You are about to alter the column `stock` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `valorCosto` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorVenta` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `precio`,
    ADD COLUMN `valorCosto` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `valorVenta` INTEGER NOT NULL,
    MODIFY `stock` DECIMAL(65, 30) NOT NULL DEFAULT 0;

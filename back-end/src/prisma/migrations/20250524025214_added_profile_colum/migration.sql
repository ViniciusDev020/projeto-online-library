/*
  Warnings:

  - Added the required column `perfil` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "perfil" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

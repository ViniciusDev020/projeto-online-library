/*
  Warnings:

  - You are about to drop the `_AuthorToLivro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToLivro" DROP CONSTRAINT "_AuthorToLivro_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToLivro" DROP CONSTRAINT "_AuthorToLivro_B_fkey";

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AuthorToLivro";

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

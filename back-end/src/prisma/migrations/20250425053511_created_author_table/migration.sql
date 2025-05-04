-- CreateTable
CREATE TABLE "Author" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToLivro" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL,

    CONSTRAINT "_AuthorToLivro_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuthorToLivro_B_index" ON "_AuthorToLivro"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToLivro" ADD CONSTRAINT "_AuthorToLivro_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToLivro" ADD CONSTRAINT "_AuthorToLivro_B_fkey" FOREIGN KEY ("B") REFERENCES "Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

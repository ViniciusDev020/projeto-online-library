-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

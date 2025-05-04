import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export type Author = {
  id: string;
  name: string;
};

export async function listarAutores() {
  return prisma.author.findMany({
    select: {
      id: true,
      name: true,
      Livro: true,
    },
  });
}

export async function autorPeloId(idLivro: string) {
  return prisma.author.findUnique({
    where: { id: idLivro },
    select: {
      name: true,
    },
  });
}

export async function removerAutor(idLivro: string) {
  return prisma.author.delete({
    where: {
      id: idLivro,
    },
  });
}

export async function criarAutor(author: Author) {
  return prisma.author.create({
    data: {
      id: uuidv4(),
      name: author.name,
    },
  });
}

export async function editarAutor(livro: Author, idLivro: string) {
  return prisma.author.update({
    where: {
      id: idLivro,
    },
    data: {
      name: livro.name,
    },
  });
}

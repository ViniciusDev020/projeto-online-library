import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import type { Livro } from "../types/livro";

const prisma = new PrismaClient();

export async function listarLivros(searchQuery: string) {
  if (searchQuery && searchQuery != "") {
    return prisma.livro.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  return prisma.livro.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function livroPeloId(idLivro: string) {
  return prisma.livro.findUnique({
    where: { id: idLivro },
    select: {
      name: true,
      description: true,
    },
  });
}

export async function removerLivro(idLivro: string) {
  return prisma.livro.delete({
    where: {
      id: idLivro,
    },
  });
}

export async function criarLivro(livro: Livro) {
  return prisma.livro.create({
    data: {
      id: uuidv4(),
      name: livro.name,
      description: livro.description,
      authorId: livro.authorId,
    },
  });
}

export async function vincularAutores(
  idLivro: string,
  autores: { id: string; name: string }[]
) {
  return prisma.author.updateMany;
}

export async function editarLivro(livro: Livro, idLivro: string) {
  return prisma.livro.update({
    where: {
      id: idLivro,
    },
    data: {
      id: livro.id,
      name: livro.name,
      description: livro.description,
    },
  });
}

export default listarLivros;

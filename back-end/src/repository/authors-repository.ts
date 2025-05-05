import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import type { pagination } from "../types/pagination";

const prisma = new PrismaClient();

export type Author = {
  id: string;
  name: string;
  age: number;
  nacionality: string;
};

export async function listarAutores(
  searchQuery: string,
  pagination: pagination
) {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  if (searchQuery && searchQuery != "") {
    const [total, totalResults, items] = await prisma.$transaction([
      prisma.author.count(),
      prisma.author.count({
        where: {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              nacionality: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          ],
        },
      }),
      prisma.author.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              nacionality: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          age: true,
          nacionality: true,
          Livro: true,
        },
        take: limit,
        skip: offset,
        orderBy: {
          name: "asc",
        },
      }),
    ]);

    return { total, totalResults, items };
  }

  const [total, totalResults, items] = await prisma.$transaction([
    prisma.author.count(),
    prisma.author.count({
      take: limit,
      skip: offset,
      orderBy: {
        name: "asc",
      },
    }),
    prisma.author.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        nacionality: true,
        Livro: true,
      },
      take: limit,
      skip: offset,
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return { total, totalResults, items };
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
      age: author.age,
      nacionality: author.nacionality,
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

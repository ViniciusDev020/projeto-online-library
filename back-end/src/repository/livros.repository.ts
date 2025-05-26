import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import type { Livro } from "../types/livro";
import type { pagination } from "../types/pagination";

const prisma = new PrismaClient();

export async function booksRefinedList(
  searchQuery: string,
  pagination: pagination
) {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  if (searchQuery && searchQuery != "") {
    const [total, totalResults, items] = await prisma.$transaction([
      prisma.livro.count(),
      prisma.livro.count({
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
      }),
      prisma.livro.findMany({
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
              id: true,
              name: true,
            },
          },
        },
      }),
    ]);

    return { total, totalResults, items };
  }
  const [total, totalResults, items] = await prisma.$transaction([
    prisma.livro.count(),
    prisma.livro.count({
      take: limit,
      skip: offset,
      orderBy: {
        name: "asc",
      },
    }),
    prisma.livro.findMany({
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
      take: limit,
      skip: offset,
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return { total, totalResults, items };
}

export async function bookById(idLivro: string) {
  return prisma.livro.findUnique({
    where: { id: idLivro },
    select: {
      name: true,
      description: true,
    },
  });
}

export async function deleteBookById(idLivro: string) {
  return prisma.livro.delete({
    where: {
      id: idLivro,
    },
  });
}

export async function createBook(livro: Livro) {
  return prisma.livro.create({
    data: {
      id: uuidv4(),
      name: livro.name,
      description: livro.description,
      authorId: livro.authorId,
    },
  });
}

export async function updateBookById(livro: Livro, idLivro: string) {
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

export default booksRefinedList;

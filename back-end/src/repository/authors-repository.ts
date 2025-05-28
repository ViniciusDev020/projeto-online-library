import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import type { pagination } from "../types/pagination";
import type { Author } from "../types/author";

const prisma = new PrismaClient();

export async function authorsRefinedList(
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

export async function authorById(authorId: string) {
  return prisma.author.findUnique({
    where: { id: authorId },
    select: {
      name: true,
      age: true,
      nacionality: true,
    },
  });
}

export async function deleteAuthorById(authorId: string) {
  return prisma.author.delete({
    where: {
      id: authorId,
    },
  });
}

export async function createAuthor(author: Author) {
  return prisma.author.create({
    data: {
      id: uuidv4(),
      name: author.name,
      age: parseInt(author.age),
      nacionality: author.nacionality,
    },
  });
}

export async function updateAuthorById(author: Author, authorId: string) {
  return prisma.author.update({
    where: {
      id: authorId,
    },
    data: {
      name: author.name,
      age: parseInt(author.age),
      nacionality: author.nacionality,
    },
  });
}

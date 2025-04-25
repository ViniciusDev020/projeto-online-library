import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function listarLivros() {
  return prisma.livro.findMany();
}

type livro = {
  id?: string;
  name: string;
  description: string;
};

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
    where: { id: idLivro },
  });
}

export async function criarLivro(livro: livro) {
  return prisma.livro.create({
    data: {
      id: randomUUID(),
      name: livro.name,
      description: livro.description,
    },
  });
}

export async function editarLivro(livro: livro, idLivro: string) {
  return prisma.livro.update({
    where: { id: idLivro },
    data: {
      id: livro.id,
      name: livro.name,
      description: livro.description,
    },
  });
}

export default listarLivros;

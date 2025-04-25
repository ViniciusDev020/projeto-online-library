import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function listarUsuarios() {
  return prisma.user.findMany();
}

type user = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};

export async function UsuarioPeloId(idUser: string) {
  return prisma.user.findUnique({
    where: { id: idUser },
    select: {
      name: true,
      email: true,
    },
  });
}

export async function removerUsuario(idUser: string) {
  return prisma.user.delete({
    where: { id: idUser },
  });
}

export async function criarUsuario(user: user) {
  return prisma.user.create({
    data: {
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
}

export async function editarUsuario(user: user, idUser: string) {
  return prisma.user.update({
    where: { id: idUser },
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

export async function login(email: string, password: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
}

export default listarUsuarios;

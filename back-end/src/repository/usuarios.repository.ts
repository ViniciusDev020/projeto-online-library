import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function usersRefinedList() {
  return prisma.user.findMany();
}

type user = {
  id?: string;
  name: string;
  email: string;
  password: string;
  profile: string;
};

export async function userById(idUser: string) {
  return prisma.user.findUnique({
    where: { id: idUser },
    select: {
      name: true,
      email: true,
      perfil: true,
    },
  });
}

export async function userByEmail(email: string) {
  return prisma.user.findUnique({
    where: { id: email },
    select: {
      name: true,
      email: true,
      perfil: true,
    },
  });
}

export async function deleteUserById(idUser: string) {
  return prisma.user.delete({
    where: { id: idUser },
  });
}

export async function createUser(user: user) {
  const saltRounds = 10;

  const hash = await bcrypt.hash(user.password, saltRounds);

  return prisma.user.create({
    data: {
      id: uuidv4(),
      name: user.name,
      email: user.email,
      password: hash,
      perfil: user.profile,
    },
  });
}

export async function updateUserById(user: user, idUser: string) {
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
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      password: true,
      email: true,
      id: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return user;
    } else {
      return null;
    }
  }
}

export default usersRefinedList;

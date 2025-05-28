import {
  userById,
  createUser,
  updateUserById,
  usersRefinedList,
  deleteUserById,
  userByEmail,
} from "../repository/usuarios.repository.ts";
import type { User } from "../types/user.ts";

export async function listAllUsersService() {
  const response = await usersRefinedList();

  return response;
}

export async function listUserByIdService(id: string) {
  const response = await userById(id);

  return response;
}

export async function deleteUserByIdService(id: string) {
  const response = await deleteUserById(id);

  return response;
}

export async function createUserService(user: User) {
  const userMail = await userByEmail(user.email);

  if (!userMail) {
    const response = await createUser(user);

    return response;
  } else {
    throw new Error("Email já existe!");
  }
}

export async function updateUserByIdService(id: string, user: User) {
  const existingUser = await userById(id);

  if (existingUser) {
    const editObject = Object.assign(existingUser, user);

    const response = await updateUserById(editObject, id);

    return response;
  }
}

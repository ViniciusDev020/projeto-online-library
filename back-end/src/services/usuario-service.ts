import {
  userById,
  createUser,
  updateUserById,
  usersRefinedList,
  deleteUserById,
  userByEmail,
} from "../repository/usuarios.repository.ts";
import type { Request, Response } from "express";

export async function listAllUsersService(req: Request, res: Response) {
  const response = await usersRefinedList();

  return response;
}

export async function listUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;

  const response = await userById(id);

  return response;
}

export async function deleteUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;

  const response = await deleteUserById(id);

  return response;
}

export async function createUserService(req: Request, res: Response) {
  const user = req.body;
  const userMail = await userByEmail(req.body.email);

  if (!userMail) {
    const response = await createUser(user);

    return response;
  } else {
    throw new Error("Email já existe!");
  }
}

export async function updateUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const user = req.body;
  const existingUser = await userById(id);

  if (existingUser) {
    const editObject = Object.assign(existingUser, user);

    const response = await updateUserById(editObject, id);

    return response;
  }
}

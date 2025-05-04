import {
  createUserService,
  deleteUserByIdService,
  listAllUsersService,
  listUserByIdService,
  updateUserByIdService,
} from "../services/usuario-service.ts";
import type { Request, Response } from "express";

export async function listAllUsers(req: Request, res: Response) {
  const response = await listAllUsersService(req, res);

  return res.json(response);
}

export async function listUserById(req: Request, res: Response) {
  const response = await listUserByIdService(req, res);

  return res.json(response);
}

export async function deleteUserById(req: Request, res: Response) {
  const response = await deleteUserByIdService(req, res);
  response;

  res.send("USUÁRIO DELETADO COM SUCESSO!");
}

export async function createUser(req: any, res: Response) {
  const response = await createUserService(req, req);
  response;

  res.send("USUÁRIO CRIADO COM SUCESSO!");
}

export async function updateUserById(req: Request, res: Response) {
  const response = await updateUserByIdService(req, res);
  response;

  res.send("USUÁRIO EDITADO COM SUCESSO!");
}

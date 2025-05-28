import {
  createUserService,
  deleteUserByIdService,
  listAllUsersService,
  listUserByIdService,
  updateUserByIdService,
} from "../services/usuario-service.ts";
import type { Request, Response } from "express";

export async function listAllUsers(req: Request, res: Response) {
  try {
    const response = await listAllUsersService();

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar usuários: ${error.message}` });
  }
}

export async function listUserById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const response = await listUserByIdService(id);

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar usuário: ${error.message}` });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const response = await deleteUserByIdService(id);
    response;

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Falha ao deletar usuário: ${error.message}` });
  }
}

export async function createUser(req: any, res: Response) {
  try {
    const user = req.body;
    const response = await createUserService(user);
    response;

    res.status(201).json({ message: `Usuário criado com sucesso! `, response });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: `Falha ao criar usuário: ${error.message}` });
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const user = req.body;
    const response = await updateUserByIdService(id, user);
    response;

    res.status(200).json({ message: "Usuário editado com sucesso!" });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: `Falha ao criar usuário: ${error.message}` });
  }
}

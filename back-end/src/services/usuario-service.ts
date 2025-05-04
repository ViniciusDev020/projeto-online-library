import {
  UsuarioPeloId,
  criarUsuario,
  editarUsuario,
  listarUsuarios,
  removerUsuario,
} from "../repository/usuarios.repository.ts";
import type { Request, Response } from "express";

export async function listAllUsersService(req: Request, res: Response) {
  const response = await listarUsuarios();

  return response;
}

export async function listUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;

  const response = await UsuarioPeloId(id);

  return response;
}

export async function deleteUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;
  console.log(id);

  const response = await removerUsuario(id);

  return response;
}

export async function createUserService(req: Request, res: Response) {
  const livro = req.body;

  const response = await criarUsuario(livro);

  return response;
}

export async function updateUserByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const user = req.body;
  const usuarioExistente = await UsuarioPeloId(id);

  if (user.name && usuarioExistente != null) {
    usuarioExistente.name = user.name;
  }
  if (user.email && usuarioExistente != null) {
    usuarioExistente.email = user.email;
  }

  if (usuarioExistente) {
    const response = await editarUsuario(usuarioExistente, id);

    response;
  }
}

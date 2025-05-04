import {
  autorPeloId,
  criarAutor,
  editarAutor,
  listarAutores,
  removerAutor,
} from "../repository/authors-repository.ts";
import type { Request, Response } from "express";

export async function listAllAuthorsService(
  req: Request,
  res: Response,
  searchQuery?: string
) {
  const response = await listarAutores();

  return response;
}

export async function listAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const response = await autorPeloId(id);

  return response;
}

export async function deleteAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;
  const response = await removerAutor(id);

  return response;
}

export async function createAuthorService(req: Request, res: Response) {
  const author = req.body;

  const response = await criarAutor(author);

  return response;
}

export async function updateAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const author = req.body;
  const existingAuthor = await autorPeloId(id);

  if (existingAuthor) {
    const editObject = Object.assign(existingAuthor, author);

    const response = await editarAutor(editObject, id);

    response;
  }
}

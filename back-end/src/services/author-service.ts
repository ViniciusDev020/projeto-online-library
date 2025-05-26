import {
  authorById,
  createAuthor,
  updateAuthorById,
  authorsRefinedList,
  deleteAuthorById,
} from "../repository/authors-repository.ts";
import type { Request, Response } from "express";

export async function listAllAuthorsService(searchQuery: any, pagination: any) {
  const response = await authorsRefinedList(searchQuery, pagination);

  return response;
}

export async function listAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const response = await authorById(id);

  return response;
}

export async function deleteAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;
  const response = await deleteAuthorById(id);

  return response;
}

export async function createAuthorService(req: Request, res: Response) {
  const author = req.body;

  const response = await createAuthor(author);

  return response;
}

export async function updateAuthorByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const author = req.body;
  const existingAuthor = await authorById(id);

  if (existingAuthor) {
    const editObject = Object.assign(existingAuthor, author);

    const response = await updateAuthorById(editObject, id);

    response;
  }
}

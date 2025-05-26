import type { Request, Response } from "express";

import {
  createAuthorService,
  deleteAuthorByIdService,
  listAllAuthorsService,
  listAuthorByIdService,
  updateAuthorByIdService,
} from "../services/author-service.ts";

export async function listAllAuthors(req: Request, res: Response) {
  const searchQuery: any = req.query.search;
  const paginationParams: any = req.query.pagination;
  const { page, limit } = JSON.parse(paginationParams);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const response = await listAllAuthorsService(searchQuery, pagination);

  return res.json(response);
}

export async function listAuthorById(req: Request, res: Response) {
  const response = await listAuthorByIdService(req, res);

  return res.json(response);
}

export async function deleteAuthorById(req: Request, res: Response) {
  const response = await deleteAuthorByIdService(req, res);
  response;

  res.send("AUTOR DELETADO COM SUCESSO!");
}

export async function createAuthor(req: any, res: Response) {
  const response = await createAuthorService(req, req);
  response;

  res.send("AUTOR CRIADO COM SUCESSO!");
}

export async function updateAuthorById(req: Request, res: Response) {
  const response = await updateAuthorByIdService(req, res);
  response;

  res.send("AUTOR EDITADO COM SUCESSO!");
}

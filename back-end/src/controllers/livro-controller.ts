import {
  createBookService,
  deleteBookByIdService,
  listAllBooksService,
  listBookByIdService,
  updateBookByIdService,
} from "../services/livro-service.ts";
import type { Request, Response } from "express";

export async function listAllBooks(req: Request, res: Response) {
  const searchQuery = req.query.search;
  const response = await listAllBooksService(req, res, searchQuery);

  return res.json(response);
}

export async function listBookById(req: Request, res: Response) {
  const response = await listBookByIdService(req, res);

  return res.json(response);
}

export async function deleteBookById(req: Request, res: Response) {
  const response = await deleteBookByIdService(req, res);
  response;

  res.send("LIVRO DELETADO COM SUCESSO!");
}

export async function createBook(req: any, res: Response) {
  const response = await createBookService(req, req);
  response;

  res.send("LIVRO CRIADO COM SUCESSO!");
}

export async function updateBookById(req: Request, res: Response) {
  const response = await updateBookByIdService(req, res);
  response;

  res.send("LIVRO EDITADO COM SUCESSO!");
}

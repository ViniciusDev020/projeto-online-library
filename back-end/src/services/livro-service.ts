import booksRefinedList, {
  createBook,
  updateBookById,
  bookById,
  deleteBookById,
} from "../repository/livros.repository.ts";
import type { Request, Response } from "express";

export async function listAllBooksService(searchQuery: any, pagination: any) {
  const response = await booksRefinedList(searchQuery, pagination);

  return response;
}

export async function listBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const response = await bookById(id);

  return response;
}

export async function deleteBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;
  const response = await deleteBookById(id);

  return response;
}

export async function createBookService(req: Request, res: Response) {
  const livro = req.body;

  const response = await createBook(livro);

  return response;
}

export async function updateBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const livro = req.body;
  const livroExistente = await bookById(id);

  if (livroExistente) {
    const copia = Object.assign(livroExistente, livro);

    const response = await updateBookById(copia, id);

    response;
  }
}

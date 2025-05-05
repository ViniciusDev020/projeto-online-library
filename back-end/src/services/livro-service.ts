import listarLivros, {
  criarLivro,
  editarLivro,
  livroPeloId,
  removerLivro,
} from "../repository/livros.repository.ts";
import type { Request, Response } from "express";

export async function listAllBooksService(
  req: Request,
  res: Response,
  searchQuery: any,
  pagination: any
) {
  const response = await listarLivros(searchQuery, pagination);

  return response;
}

export async function listBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const response = await livroPeloId(id);

  return response;
}

export async function deleteBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id: string = params.id;
  const response = await removerLivro(id);

  return response;
}

export async function createBookService(req: Request, res: Response) {
  const livro = req.body;

  const response = await criarLivro(livro);

  return response;
}

export async function updateBookByIdService(req: Request, res: Response) {
  const params = req.params;
  const id = params.id;
  const livro = req.body;
  const livroExistente = await livroPeloId(id);

  if (livroExistente) {
    const copia = Object.assign(livroExistente, livro);

    const response = await editarLivro(copia, id);

    response;
  }
}

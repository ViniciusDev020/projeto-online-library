import {
  createBookService,
  deleteBookByIdService,
  listAllBooksService,
  listBookByIdService,
  updateBookByIdService,
} from "../services/livro-service.ts";
import type { Request, Response } from "express";

export async function listAllBooks(req: Request, res: Response) {
  try {
    const searchQuery: any = req.query.search;
    const paginationParams: any = req.query.pagination;
    const { page, limit } = JSON.parse(paginationParams);

    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const response = await listAllBooksService(searchQuery, pagination);

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar livros: ${error.message}` });
  }
}

export async function listBookById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;

    const response = await listBookByIdService(id);

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar livro: ${error.message}` });
  }
}

export async function deleteBookById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const response = await deleteBookByIdService(id);
    response;

    res.status(200).json({ message: "Livro deletado com sucesso!" });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao deletar livro: ${error.message}` });
  }
}

export async function createBook(req: any, res: Response) {
  try {
    const livro = req.body;
    const response = await createBookService(livro);
    response;

    res.status(201).json({ message: "Livro criado com sucesso!", response });
  } catch (error: any) {
    res.status(400).json({ message: `Falha ao criar livro: ${error.message}` });
  }
}

export async function updateBookById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const livro = req.body;

    const response = await updateBookByIdService(id, livro);
    response;

    res.status(200).json({ message: "Livro editado com sucesso!" });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao editar livro!: ${error.message}` });
  }
}

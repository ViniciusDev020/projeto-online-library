import type { Request, Response } from "express";

import {
  createAuthorService,
  deleteAuthorByIdService,
  listAllAuthorsService,
  listAuthorByIdService,
  updateAuthorByIdService,
} from "../services/author-service.ts";

export async function listAllAuthors(req: Request, res: Response) {
  try {
    const searchQuery: any = req.query.search;
    const paginationParams: any = req.query.pagination;
    const { page, limit } = JSON.parse(paginationParams);

    const pagination = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const response = await listAllAuthorsService(searchQuery, pagination);

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar autores: ${error.message}` });
  }
}

export async function listAuthorById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;

    const response = await listAuthorByIdService(id);

    return res.json(response);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao listar autor: ${error.message}` });
  }
}

export async function deleteAuthorById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const response = await deleteAuthorByIdService(id);
    response;

    res.status(200).json({ message: "Autor deletado com sucesso!" });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao deletar autor: ${error.message}` });
  }
}

export async function createAuthor(req: any, res: Response) {
  try {
    const author = req.body;
    const response = await createAuthorService(author);
    response;

    res.status(201).json({ message: "Autor criado com sucesso!", response });
  } catch (error: any) {
    res.status(400).json({ message: `Falha ao criar autor: ${error.message}` });
  }
}

export async function updateAuthorById(req: Request, res: Response) {
  try {
    const params = req.params;
    const id = params.id;
    const author = req.body;
    const response = await updateAuthorByIdService(id, author);
    response;

    res.status(200).json({ message: "Autor editado com sucesso!", response });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: `Falha ao editar autor: ${error.message}` });
  }
}

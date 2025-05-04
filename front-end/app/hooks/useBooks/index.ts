import {
  listarLivros,
  deletarLivro,
  criarNovoLivro,
  editarLivro,
} from "../../api/routes/livros/index";
import { BookCreate, BookUpdate } from "../../types/tipoLivro";

export async function listBooks() {
  const books = await listarLivros();

  return books;
}

export async function deleteBooks(id: string, token: string) {
  const books = await deletarLivro(id, token);

  return books;
}

export async function editBooks(book: BookUpdate, token: string) {
  const books = await editarLivro(book, token);

  return books;
}

export async function criarLivro(book: BookCreate, token: string) {
  const books = await criarNovoLivro(book, token);

  return books;
}

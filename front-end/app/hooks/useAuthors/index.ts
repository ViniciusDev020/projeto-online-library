import { Author } from "../../types/tipoAutor";
import {
  criarNovoAutor,
  deletarAutor,
  editarAutor,
  listarAutores,
} from "../../api/routes/autores/index";

export async function listBooks() {
  const books = await listarAutores();

  return books;
}

export async function deleteBooks(id: string, token: string) {
  const books = await deletarAutor(id, token);

  return books;
}

export async function editBooks(book: Author, token: string) {
  const books = await editarAutor(book, token);

  return books;
}

export async function criarAutor(book: Author, token: string) {
  const books = await criarNovoAutor(book, token);

  return books;
}

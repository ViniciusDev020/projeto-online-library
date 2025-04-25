import {
  listarLivros,
  deletarLivro,
  criarNovoLivro,
  editarLivro,
  login,
} from "../api/routes/index";
import { Book } from "../types/tipoLivro";

// export async function loginUsuario() {
//   const res = await login("joao@outlook.com", "123456");

//   return res;
// }

export async function listBooks() {
  const books = await listarLivros();

  return books;
}

export async function deleteBooks(id: string, token: string) {
  const books = await deletarLivro(id, token);

  return books;
}

export async function editBooks(book: Book, token: string) {
  const books = await editarLivro(book, token);

  return books;
}

export async function criarLivro(book, token) {
  const books = await criarNovoLivro(book, token);

  return books;
}

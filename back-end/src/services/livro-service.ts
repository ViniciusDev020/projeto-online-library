import booksRefinedList, {
  createBook,
  updateBookById,
  bookById,
  deleteBookById,
} from "../repository/livros.repository.ts";
import type { Livro } from "../types/livro.ts";

export async function listAllBooksService(searchQuery: any, pagination: any) {
  const allBooks = await booksRefinedList(searchQuery, pagination);

  return allBooks;
}

export async function listBookByIdService(id: string) {
  const book = await bookById(id);

  return book;
}

export async function deleteBookByIdService(id: string) {
  const response = await deleteBookById(id);

  return response;
}

export async function createBookService(livro: Livro) {
  const newBook = await createBook(livro);

  return newBook;
}

export async function updateBookByIdService(id: string, livro: Livro) {
  const existingBook = await bookById(id);

  if (existingBook) {
    const bookCopy = Object.assign(existingBook, livro);

    const response = await updateBookById(bookCopy, id);

    response;
  }
}

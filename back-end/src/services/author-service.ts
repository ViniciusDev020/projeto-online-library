import {
  authorById,
  createAuthor,
  updateAuthorById,
  authorsRefinedList,
  deleteAuthorById,
} from "../repository/authors-repository.ts";
import type { Author } from "../types/author.ts";

export async function listAllAuthorsService(searchQuery: any, pagination: any) {
  const response = await authorsRefinedList(searchQuery, pagination);

  return response;
}

export async function listAuthorByIdService(id: string) {
  const response = await authorById(id);

  return response;
}

export async function deleteAuthorByIdService(id: string) {
  const response = await deleteAuthorById(id);

  return response;
}

export async function createAuthorService(author: Author) {
  const response = await createAuthor(author);

  return response;
}

export async function updateAuthorByIdService(id: string, author: Author) {
  const existingAuthor = await authorById(id);

  if (existingAuthor) {
    const editObject = Object.assign(existingAuthor, author);

    const response = await updateAuthorById(editObject, id);

    response;
  }
}

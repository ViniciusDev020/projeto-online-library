import { pagination } from "../../../types/pagination";
import { BookCreate, BookUpdate } from "../../../types/tipoLivro";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function listarLivros(
  token?: string,
  searchParams?: string,
  pagination?: pagination
) {
  if (!searchParams) {
    searchParams = "";
  }
  const req = await fetch(
    `${apiUrl}/livrosCadastrados?search=${searchParams}&pagination=${JSON.stringify(
      pagination
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const res = await req.json();

  return res;
}

export async function deletarLivro(id: string, token?: string) {
  const req = await fetch(`${apiUrl}/livrosCadastrados/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return req;
}

export async function editarLivro(book: BookUpdate, token?: string) {
  const req = await fetch(`${apiUrl}/livrosCadastrados/${book.id}`, {
    method: "PUT",
    body: JSON.stringify(book),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return req;
}

export async function criarNovoLivro(book: BookCreate, token?: string) {
  const req = await fetch(`${apiUrl}/livrosCadastrados`, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return req;
}

export default listarLivros;

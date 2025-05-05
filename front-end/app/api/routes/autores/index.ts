import { pagination } from "../../../types/pagination";
import { Author } from "../../../types/tipoAutor";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function listarAutores(
  token: string,
  searchParams: string,
  pagination: pagination
) {
  const req = await fetch(
    `${apiUrl}/autoresCadastrados?search=${searchParams}&pagination=${JSON.stringify(
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

export async function deletarAutor(id: string, token?: string) {
  const req = await fetch(`${apiUrl}/autoresCadastrados/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function editarAutor(autor: any, token?: string) {
  const req = await fetch(`${apiUrl}/autoresCadastrados/${autor.id}`, {
    method: "PUT",
    body: JSON.stringify(autor),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export async function criarNovoAutor(autor: Author, token?: string) {
  const req = await fetch(`${apiUrl}/autoresCadastrados`, {
    method: "POST",
    body: JSON.stringify(autor),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

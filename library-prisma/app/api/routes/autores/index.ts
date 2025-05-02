import { Author } from "../../../types/tipoAutor";

export async function listarAutores(token?: string) {
  const req = await fetch("http://localhost:3001/autoresCadastrados", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await req.json();

  return res;
}

export async function deletarAutor(id: string, token?: string) {
  const req = await fetch(`http://localhost:3001/autoresCadastrados/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export async function editarAutor(autor: Author, token?: string) {
  const req = await fetch(
    `http://localhost:3001/autoresCadastrados/${autor.id}`,
    {
      method: "PUT",
      body: JSON.stringify(autor),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function criarNovoAutor(autor: Author, token?: string) {
  const req = await fetch(`http://localhost:3001/autoresCadastrados`, {
    method: "POST",
    body: JSON.stringify(autor),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

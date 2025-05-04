import { Book, BookUpdate } from "../../../types/tipoLivro";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function listarLivros(token?: string, searchParams?: string) {
  if (!searchParams) {
    searchParams = "";
  }
  const req = await fetch(
    `${apiUrl}/livrosCadastrados?search=${searchParams}`,
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
}

export async function criarNovoLivro(book: Book, token?: string) {
  const req = await fetch(`${apiUrl}/livrosCadastrados`, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
}

export async function login(email: string, password: string) {
  const req = await fetch(`${apiUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await req.json();
  console.log("RESPONSE MESSAGE", res.message);
  return res;
}
export default listarLivros;

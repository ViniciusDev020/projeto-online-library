import { userType } from "../../../types/tipoUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const req = await fetch(`${apiUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await req.json();

  return res;
}

export async function registerUser(userCredentials: userType) {
  const { name, email, password, profile } = userCredentials;

  const req = await fetch(`${apiUrl}/usuariosCadastrados`, {
    method: "POST",
    body: JSON.stringify({ name, email, password, profile }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = req.json();

  return { response: res, status: req.status };
}

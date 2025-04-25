import listarLivros, { login } from "../api/routes";

const token = document?.cookie.replace("token=", "");

export const response = await listarLivros(token);

export const responseObject = response;

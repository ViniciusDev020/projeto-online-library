import {
  createUserService,
  deleteUserByIdService,
  listAllUsersService,
  listUserByIdService,
  updateUserByIdService,
} from "../services/usuario-service.ts";

export async function listAllUsers(req, res) {
  const response = await listAllUsersService(req, res);

  return res.json(response);
}

export async function listUserById(req, res) {
  const response = await listUserByIdService(req, res);

  return res.json(response);
}

export async function deleteUserById(req, res) {
  const response = await deleteUserByIdService(req, res);
  response;

  res.send("USUÁRIO DELETADO COM SUCESSO!");
}

export async function createUser(req, res) {
  const response = await createUserService(req, req);
  response;

  res.send("USUÁRIO CRIADO COM SUCESSO!");
}

export async function updateUserById(req, res) {
  const response = await updateUserByIdService(req, res);
  response;

  res.send("USUÁRIO EDITADO COM SUCESSO!");
}

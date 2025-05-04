import {
  createAuthorService,
  deleteAuthorByIdService,
  listAllAuthorsService,
  listAuthorByIdService,
  updateAuthorByIdService,
} from "../services/author-service";

export async function listAllAuthors(req, res) {
  const searchQuery = req.query.search;
  const response = await listAllAuthorsService(req, res, searchQuery);

  return res.json(response);
}

export async function listAuthorById(req, res) {
  const response = await listAuthorByIdService(req, res);

  return res.json(response);
}

export async function deleteAuthorById(req, res) {
  const response = await deleteAuthorByIdService(req, res);
  response;

  res.send("AUTOR DELETADO COM SUCESSO!");
}

export async function createAuthor(req, res) {
  const response = await createAuthorService(req, req);
  response;

  res.send("AUTOR CRIADO COM SUCESSO!");
}

export async function updateAuthorById(req, res) {
  const response = await updateAuthorByIdService(req, res);
  response;

  res.send("AUTOR EDITADO COM SUCESSO!");
}

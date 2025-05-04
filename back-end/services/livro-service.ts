import listarLivros, {
  criarLivro,
  editarLivro,
  livroPeloId,
  removerLivro,
} from "../repository/livros.repository.ts";

export async function listAllBooksService(req, res, searchQuery) {
  const response = await listarLivros(searchQuery);

  return response;
}

export async function listBookByIdService(req, res) {
  const params = req.params;
  const id = params.id;
  const response = await livroPeloId(id);

  return response;
}

export async function deleteBookByIdService(req, res) {
  const params = req.params;
  const id: string = params.id;
  const response = await removerLivro(id);

  return response;
}

export async function createBookService(req, res) {
  const livro = req.body;

  const response = await criarLivro(livro);

  return response;
}

export async function updateBookByIdService(req, res) {
  const params = req.params;
  const id = params.id;
  const livro = req.body;
  const livroExistente = await livroPeloId(id);

  if (livroExistente) {
    const copia = Object.assign(livroExistente, livro);

    const response = await editarLivro(copia, id);

    response;
  }
}

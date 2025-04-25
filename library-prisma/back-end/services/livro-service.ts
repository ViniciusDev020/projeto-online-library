import listarLivros, {
  criarLivro,
  editarLivro,
  livroPeloId,
  removerLivro,
} from "../repository/livros.repository.ts";

export async function listAllBooksService(req, res) {
  const response = await listarLivros();

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
  console.log(id);

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

  if (livro.name && livroExistente != null) {
    livroExistente.name = livro.name;
  }
  if (livro.description && livroExistente != null) {
    livroExistente.description = livro.description;
  }

  if (livroExistente) {
    const response = await editarLivro(livroExistente, id);

    response;
  }
}

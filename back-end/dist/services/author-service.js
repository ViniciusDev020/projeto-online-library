import { autorPeloId, criarAutor, editarAutor, listarAutores, removerAutor, } from "../repository/authors-repository.ts";
export async function listAllAuthorsService(req, res, searchQuery) {
    const response = await listarAutores();
    return response;
}
export async function listAuthorByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    const response = await autorPeloId(id);
    return response;
}
export async function deleteAuthorByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    const response = await removerAutor(id);
    return response;
}
export async function createAuthorService(req, res) {
    const author = req.body;
    const response = await criarAutor(author);
    return response;
}
export async function updateAuthorByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    const author = req.body;
    const existingAuthor = await autorPeloId(id);
    if (existingAuthor) {
        const editObject = Object.assign(existingAuthor, author);
        const response = await editarAutor(editObject, id);
        response;
    }
}

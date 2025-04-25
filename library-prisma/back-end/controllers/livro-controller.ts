import { createBookService, deleteBookByIdService, listAllBooksService, listBookByIdService, updateBookByIdService } from "../services/livro-service.ts";

export async function listAllBooks (req, res){
        const response = await listAllBooksService(req, res);
    
        return res.json(response);
}

export async function listBookById (req, res){
    const response = await listBookByIdService(req, res);

    return res.json(response);
}

export async function deleteBookById (req, res){
        const response = await deleteBookByIdService(req, res);
        response;

        res.send("LIVRO DELETADO COM SUCESSO!");
}

export async function createBook (req, res){
        const response = await createBookService(req, req);
        response;

        res.send("LIVRO CRIADO COM SUCESSO!");
}

export async function updateBookById(req, res){
        const response = await updateBookByIdService(req, res);
        response;

        res.send("LIVRO EDITADO COM SUCESSO!");
}
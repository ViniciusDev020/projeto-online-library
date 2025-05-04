import { UsuarioPeloId, criarUsuario, editarUsuario, listarUsuarios, removerUsuario, } from "../repository/usuarios.repository.ts";
export async function listAllUsersService(req, res) {
    const response = await listarUsuarios();
    return response;
}
export async function listUserByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    const response = await UsuarioPeloId(id);
    return response;
}
export async function deleteUserByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    console.log(id);
    const response = await removerUsuario(id);
    return response;
}
export async function createUserService(req, res) {
    const livro = req.body;
    const response = await criarUsuario(livro);
    return response;
}
export async function updateUserByIdService(req, res) {
    const params = req.params;
    const id = params.id;
    const user = req.body;
    const usuarioExistente = await UsuarioPeloId(id);
    if (user.name && usuarioExistente != null) {
        usuarioExistente.name = user.name;
    }
    if (user.email && usuarioExistente != null) {
        usuarioExistente.email = user.email;
    }
    if (usuarioExistente) {
        const response = await editarUsuario(usuarioExistente, id);
        response;
    }
}

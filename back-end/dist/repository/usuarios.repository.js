import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
export async function listarUsuarios() {
    return prisma.user.findMany();
}
export async function UsuarioPeloId(idUser) {
    return prisma.user.findUnique({
        where: { id: idUser },
        select: {
            name: true,
            email: true,
        },
    });
}
export async function removerUsuario(idUser) {
    return prisma.user.delete({
        where: { id: idUser },
    });
}
export async function criarUsuario(user) {
    return prisma.user.create({
        data: {
            id: uuidv4(),
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
}
export async function editarUsuario(user, idUser) {
    return prisma.user.update({
        where: { id: idUser },
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
}
export async function login(email, password) {
    return prisma.user.findUnique({
        where: {
            email: email,
            password: password,
        },
    });
}
export default listarUsuarios;

import { UsuarioPeloId } from "../repository/usuarios.repository.ts";

async function verifyRole(userId?: string) {
  if (userId) {
    const userById = await UsuarioPeloId(userId);

    return userById?.perfil;
  }
  return "";
}

export default verifyRole;

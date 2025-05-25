import { UsuarioPeloId } from "../repository/usuarios.repository.ts";

async function verifyRole(userId: string) {
  const userById = await UsuarioPeloId(userId);

  return userById?.perfil;
}

export default verifyRole;

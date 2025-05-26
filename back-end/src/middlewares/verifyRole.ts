import { userById } from "../repository/usuarios.repository.ts";

async function verifyRole(userId?: string) {
  if (userId) {
    const user = await userById(userId);

    return user?.perfil;
  }
  return "";
}

export default verifyRole;

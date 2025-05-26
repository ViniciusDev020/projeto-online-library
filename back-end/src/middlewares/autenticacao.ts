import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/login-controller.ts";
import verifyRole from "./verifyRole.ts";

async function autenticacao(
  req: any,
  res: any,
  next: any,
  grantRole: string[]
) {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded: any = jwt.decode(token);
  const role = await verifyRole(decoded?.userId);
  const isValidRole = grantRole.filter((r) => r == role);

  if (!token || isValidRole.length == 0) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido!" });
    } else {
      next();
    }
  });
}

export default autenticacao;

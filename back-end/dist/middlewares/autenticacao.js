import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/login-controller.ts";
export async function autenticacao(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Não autorizado" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: "Não autorizado: token inválido!" });
        }
        else {
            next();
        }
    });
}

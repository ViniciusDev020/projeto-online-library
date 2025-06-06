import { login } from "../repository/usuarios.repository.ts";
import jwt from "jsonwebtoken";
export const JWT_SECRET = "your_jwt_secret";
const generateToken = (userPassword) => {
    return jwt.sign({ userPassword }, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
};
export async function realizarLogin(req, res) {
    try {
        const user = req.body;
        const userRep = await login(user.email, user.password);
        if (!userRep) {
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }
        const token = generateToken(user.password);
        res.json({ token });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

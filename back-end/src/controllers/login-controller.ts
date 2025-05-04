import type { Request, Response } from "express";
import { login } from "../repository/usuarios.repository.ts";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "your_jwt_secret";

const generateToken = (userPassword: string): string => {
  return jwt.sign({ userPassword }, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
};

export async function realizarLogin(req: Request, res: Response) {
  try {
    const user = req.body;

    const userRep = await login(user.email, user.password);

    if (!userRep) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = generateToken(user.password);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
}

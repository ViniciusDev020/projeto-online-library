import express from "express";
import LivrosRouter from "../routes/livros-router.ts";
import UsuariosRouter from "../routes/usuarios-router.ts";
import AutoresRouter from "../routes/autores-router.ts";
import cors from "cors";
import login from "../routes/login.ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Conectado ao banco com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

testConnection();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/login", login);
app.use("/livrosCadastrados", LivrosRouter);
app.use("/usuariosCadastrados", UsuariosRouter);
app.use("/autoresCadastrados", AutoresRouter);
app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});

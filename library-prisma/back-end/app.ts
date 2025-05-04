import express from "express";
import LivrosRouter from "./routes/livros-router.ts";
import UsuariosRouter from "./routes/usuarios-router.ts";
import AutoresRouter from "./routes/autores-router.ts";
import cors from "cors";
import login from "./routes/login.ts";
import { autenticacao } from "./middlewares/autenticacao.ts";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use(autenticacao);
app.use("/livrosCadastrados", LivrosRouter);
app.use("/usuariosCadastrados", UsuariosRouter);
app.use("/autoresCadastrados", AutoresRouter);
app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});

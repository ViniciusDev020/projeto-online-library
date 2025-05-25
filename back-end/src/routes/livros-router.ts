import Router from "express";
import {
  createBook,
  deleteBookById,
  listAllBooks,
  listBookById,
  updateBookById,
} from "../controllers/livro-controller.ts";
import autenticacao from "../middlewares/autenticacao.ts";

const LivrosRouter = Router();

LivrosRouter.get(
  "/",
  (req, res, next) => {
    autenticacao(req, res, next, ["usuario", "admin"]);
  },
  (req, res) => {
    listAllBooks(req, res);
  }
);

LivrosRouter.get(
  "/:id",
  (req, res, next) => {
    autenticacao(req, res, next, ["usuario", "admin"]);
  },
  (req, res) => {
    listBookById(req, res);
  }
);

LivrosRouter.delete(
  "/:id",
  (req, res, next) => {
    autenticacao(req, res, next, ["admin"]);
  },
  (req, res) => {
    deleteBookById(req, res);
  }
);

LivrosRouter.post(
  "/",
  (req, res, next) => {
    autenticacao(req, res, next, ["admin", "usuario"]);
  },
  (req, res) => {
    createBook(req, res);
  }
);

LivrosRouter.put(
  "/:id",
  (req, res, next) => {
    autenticacao(req, res, next, ["admin"]);
  },
  (req, res) => {
    updateBookById(req, res);
  }
);

export default LivrosRouter;

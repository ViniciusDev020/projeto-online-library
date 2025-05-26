import Router from "express";
import {
  createAuthor,
  deleteAuthorById,
  listAllAuthors,
  listAuthorById,
  updateAuthorById,
} from "../controllers/autores-controller.ts";
import authentication from "../middlewares/autenticacao.ts";

const AutoresRouter = Router();

AutoresRouter.get(
  "/",
  (req, res, next) => {
    authentication(req, res, next, ["usuario", "admin"]);
  },
  (req, res) => {
    listAllAuthors(req, res);
  }
);

AutoresRouter.get(
  "/:id",
  (req, res, next) => {
    authentication(req, res, next, ["usuario", "admin"]);
  },
  (req, res) => {
    listAuthorById(req, res);
  }
);

AutoresRouter.delete(
  "/:id",
  (req, res, next) => {
    authentication(req, res, next, ["admin"]);
  },
  (req, res) => {
    deleteAuthorById(req, res);
  }
);

AutoresRouter.post(
  "/",
  (req, res, next) => {
    authentication(req, res, next, ["usuario", "admin"]);
  },
  (req, res) => {
    createAuthor(req, res);
  }
);

AutoresRouter.put(
  "/:id",
  (req, res, next) => {
    authentication(req, res, next, ["admin"]);
  },
  (req, res) => {
    updateAuthorById(req, res);
  }
);

export default AutoresRouter;

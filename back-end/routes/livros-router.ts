import Router from "express";
import {
  createBook,
  deleteBookById,
  listAllBooks,
  listBookById,
  updateBookById,
} from "../controllers/livro-controller";

const LivrosRouter = Router();

LivrosRouter.get("/", (req, res) => {
  listAllBooks(req, res);
});

LivrosRouter.get("/:id", async (req, res) => {
  listBookById(req, res);
});

LivrosRouter.delete("/:id", async (req, res) => {
  deleteBookById(req, res);
});

LivrosRouter.post("/", async (req, res) => {
  createBook(req, res);
});

LivrosRouter.put("/:id", async (req, res) => {
  updateBookById(req, res);
});

export default LivrosRouter;

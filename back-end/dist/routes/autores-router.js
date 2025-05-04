import Router from "express";
import { createAuthor, deleteAuthorById, listAllAuthors, listAuthorById, updateAuthorById, } from "../controllers/autores-controller.ts";
const AutoresRouter = Router();
AutoresRouter.get("/", (req, res) => {
    listAllAuthors(req, res);
});
AutoresRouter.get("/:id", async (req, res) => {
    listAuthorById(req, res);
});
AutoresRouter.delete("/:id", async (req, res) => {
    deleteAuthorById(req, res);
});
AutoresRouter.post("/", async (req, res) => {
    createAuthor(req, res);
});
AutoresRouter.put("/:id", async (req, res) => {
    updateAuthorById(req, res);
});
export default AutoresRouter;

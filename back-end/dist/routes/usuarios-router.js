import Router from "express";
import { createUser, deleteUserById, listAllUsers, listUserById, updateUserById, } from "../controllers/usuario-controller.ts";
const UsuariosRouter = Router();
UsuariosRouter.get("/", (req, res) => {
    listAllUsers(req, res);
});
UsuariosRouter.get("/:id", async (req, res) => {
    listUserById(req, res);
});
UsuariosRouter.delete("/:id", async (req, res) => {
    deleteUserById(req, res);
});
UsuariosRouter.post("/", async (req, res) => {
    createUser(req, res);
});
UsuariosRouter.put("/:id", async (req, res) => {
    updateUserById(req, res);
});
export default UsuariosRouter;

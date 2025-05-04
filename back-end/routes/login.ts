import Router from "express";
import { realizarLogin } from "../controllers/login-controller";

const login = Router();

login.post("/", async (req, res) => {
  realizarLogin(req, res);
});

export default login;

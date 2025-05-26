import Router from "express";
import { handleLogin } from "../controllers/login-controller.ts";

const login = Router();

login.post("/", async (req, res) => {
  handleLogin(req, res);
});

export default login;

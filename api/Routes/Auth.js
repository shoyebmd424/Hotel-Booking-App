import Express  from "express";
import { login, register } from "../Controller/Authcontroller.js";
const Router= Express.Router();
Router.post("/register",register);
Router.post("/login",login);

export default Router;
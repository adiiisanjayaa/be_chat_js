import { Router } from "express";
import auth from "./authentication";
import user from "./user";
import message from "./message";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/message", message);

module.exports = routes;

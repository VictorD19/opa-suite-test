import { Router } from "express";
import AuthRoutes from "./authRoutes.js";

const routes = Router();
routes.use(AuthRoutes)

export default routes;
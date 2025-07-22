import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import UserRoutes from "./userRoutes.js";
import ConversationRoutes from "./conversationRoutes.js";

const routes = Router();
routes.use(AuthRoutes);
routes.use(UserRoutes);
routes.use(ConversationRoutes);
export default routes;

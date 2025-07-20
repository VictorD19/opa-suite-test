import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/authController.js";
import UserRepository from "../../infrastructure/repository/userRepository.js";
import CreateUser from "../../application/useCases/user/createUser.js";
import CyptoService from "../../infrastructure/services/crytoServices.js"
import UserModel from "../../infrastructure/models/userModel.js";

const router = Router()
const authContoller = new AuthController(new CreateUser(new UserRepository(UserModel), new CyptoService()));
router.post("/register", authContoller.Register)
router.post("/login", passport.authenticate("local"), authContoller.Login)
router.post("/logout", authContoller.Logout)
export default router;
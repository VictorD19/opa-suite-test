import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/authController.js";
import UserRepository from "../../infrastructure/repository/userRepository.js";
import CreateUser from "../../application/useCases/user/createUser.js";
import UserModel from "../../infrastructure/models/userModel.js";
import CryptoService from "../../infrastructure/services/crytoServices.js";

const router = Router()
const useCreate = new CreateUser(new UserRepository(UserModel), new CryptoService());
const authContoller = new AuthController(useCreate);
router.post("/register", (req, res) => authContoller.Register(req, res))
router.post("/login", passport.authenticate("local"), authContoller.Login)
router.post("/logout", authContoller.Logout)
export default router;
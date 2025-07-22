import { Router } from "express";
import UserController from "../controllers/userController.js";
import FindUser from "../../application/useCases/user/findUser.js";
import UserRepository from "../../infrastructure/repository/userRepository.js";
import UserModel from "../../infrastructure/models/userModel.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import GetAllUsers from "../../application/useCases/user/getAllUser.js";

const router = Router();
const userReposity= new UserRepository(UserModel);
const findUser = new FindUser(userReposity);
const allUsers = new GetAllUsers(userReposity)
let userController = new UserController(findUser,allUsers);
router.get("/me",isAuthenticated, userController.GetUser);
router.get("/allUsers",isAuthenticated, async (req,res)=> await userController.GetAllUser(req,res));
router.get("/:id/details",isAuthenticated, async (req,res)=> await userController.GetDetailsReceiverUser(req,res));
export default router;

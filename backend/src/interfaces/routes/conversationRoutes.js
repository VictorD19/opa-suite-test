import { Router } from "express";
import ConversationController from "../controllers/conversationController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import GetConversationsByUser from "../../application/useCases/conversation/getConversatiosByUser.js";
import ConversationRepository from "../../infrastructure/repository/conversationRepository.js";
import ConversationModel from "../../infrastructure/models/conversationModel.js";
import GetAllMessages from "../../application/useCases/message/getAllMessages.js";
import MessageRepository from "../../infrastructure/repository/messageRepository.js";
import MessageModel from "../../infrastructure/models/messageModel.js";
const router = Router();
const meesageRepository = new MessageRepository(MessageModel)
const conversationsRepository = new ConversationRepository(ConversationModel);
const getAllMessages = new GetAllMessages(meesageRepository,conversationsRepository)
const getConvesationsByUser = new GetConversationsByUser(conversationsRepository);
let controller = new ConversationController(getConvesationsByUser,getAllMessages);
router.get("/allConversations", isAuthenticated, async(req,res)=> await  controller.GetConversations(req,res));
router.get("/:id/messages", isAuthenticated, async(req,res)=> await  controller.GetMessagesConversation(req,res));

export default router;

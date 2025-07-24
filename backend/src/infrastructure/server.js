import { app, sessionMiddleware } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cluster from "cluster";
import os from "node:os"
import process from "node:process";
import sharedSession from "express-socket.io-session";

import { IniciarDBMongo } from "./database/mongo.js";
import { chatHandler } from "../interfaces/handlers/chatHandlers.js";
import CreateConversation from "../application/useCases/conversation/createConversation.js";
import MarkMessageAsRead from "../application/useCases/conversation/markMessagesAsRead.js";
import UpdateStateConversation from "../application/useCases/conversation/uptadeStateConversation.js";
import SendMessage from "../application/useCases/message/sendMessage.js";
import UpdateUserLastSeen from "../application/useCases/user/updateUserLastSeen.js";
import UpdateUserOnlineState from "../application/useCases/user/updateUserOnlineStatus.js";
import UserRepository from "./repository/userRepository.js";
import ConversationRepository from "./repository/conversationRepository.js";
import MessageRepository from "./repository/messageRepository.js";
import UserModel from "./models/userModel.js";
import ConversationModel from "./models/conversationModel.js";
import MessageModel from "./models/messageModel.js";
import GetAllMessages from "../application/useCases/message/getAllMessages.js";
import FindUser from "../application/useCases/user/findUser.js";

function UsesCases() {
  let conversationRepository = new ConversationRepository(ConversationModel);
  let messageRepository = new MessageRepository(MessageModel);
  let userRepository = new UserRepository(UserModel);
  return {
    createConversation: new CreateConversation(conversationRepository),
    markMessageAsRead: new MarkMessageAsRead(conversationRepository),
    updateStateConversation: new UpdateStateConversation(
      conversationRepository
    ),
    sendMessage: new SendMessage(messageRepository, conversationRepository),
    updateUserLastSeen: new UpdateUserLastSeen(userRepository),
    updateUserOnlineState: new UpdateUserOnlineState(userRepository),
    getAllMessages: new GetAllMessages(messageRepository, conversationRepository),
    findUser: new FindUser(userRepository)
  };
}
const server = async () => {
  await IniciarDBMongo();

  const server = createServer(app);
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: process.env.URL_FRONT_END,
      credentials: true,
    },
  });
  io.use(
    sharedSession(sessionMiddleware, {
      autoSave: true,
    })
  );

  io.on("connection", (socket) => {

    let user = socket.handshake.session.passport?.user;
    if (!user)
      user = socket.handshake.query.userId;

    if (!user) {
      console.log("🔴 Socket não autenticado, desconectando...");
      return socket.disconnect(true);
    }
    if (user) {
      socket.userId = user
      socket.join(user);
    };


    console.log("Socket  autenticado");
    chatHandler(socket, io, UsesCases());
  });

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} Workers: ${process.pid}`);
  });
};

function GetQuantityCluster() {

  const quantityCluster = process.env.QUANTIDADE_CLUSTER
  const quantityTotalCluster = os.availableParallelism();
  if (quantityCluster == "ALL")
    return quantityTotalCluster

  if (quantityCluster > quantityTotalCluster)
    return quantityTotalCluster
  return quantityCluster
}

const numCPUs = GetQuantityCluster();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // reinicia o worker se necessário
  });

} else {

  server();

}


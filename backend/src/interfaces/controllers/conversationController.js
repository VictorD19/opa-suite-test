import AppError from "../../shared/errors/appErros.js";

class ConversationController {
  constructor(getConvesationsByUser, getAllMessages) {
    this._getConvesationsByUser = getConvesationsByUser;
    this._getAllMessages = getAllMessages;
  }

  async GetConversations(request, response) {
    try {
      return response.json(
        await this._getConvesationsByUser.Get(request.user.id)
      );
    } catch (error) {
      if (error instanceof AppError)
        return response.status(error.statusCode).json({ erro: error.message });

      return response.status(400).json({
        erro: "Ocorreu um erro ao tentar obter os detalhes do usuario",
      });
    }
  }
  async GetMessagesConversation(request, response) {
    try {
      let idConversation = request.params.id;
      let { receiverId } = request.query;
      let senderId = request.user.id;
      return response.json(
        await this._getAllMessages.Get(idConversation, senderId, receiverId)
      );
    } catch (error) {
      if (error instanceof AppError)
        return response.status(error.statusCode).json({ erro: error.message });

      return response.status(400).json({
        erro: "Ocorreu um erro ao tentar obter os detalhes do usuario",
      });
    }
  }
}

export default ConversationController;

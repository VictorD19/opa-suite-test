import AppError from "../../../shared/errors/appErros.js";

class GetAllMessages {
  constructor(messageRepository, conversationRepository) {
    this._messageRepository = messageRepository;
    this._conversationRepository = conversationRepository
  }

  async Get(idConversation,senderId, receiverId) {
   
    if(!idConversation && !receiverId)
       throw new AppError("Informações insuficientes para obter o historio de mensagens")

    let existConversationById = await this._conversationRepository.existsConversationByID(idConversation);
    if(existConversationById)
      return await this._messageRepository.GetAllMessagesByConversationId(idConversation)

    return  await this._messageRepository.GetAllMessagesByParticipants(senderId,receiverId)
  }
}

export default GetAllMessages

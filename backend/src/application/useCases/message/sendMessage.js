import AppError from "../../../shared/errors/appErros.js";

class SendMessage {
  constructor(messageRepository, conversationRepository) {
    this._messageRepository = messageRepository;
    this._conversationRepository = conversationRepository;
  }
  async send({ senderId, receiverId, content, type, conversationId }) {
    let existsConversations;

    if (conversationId != 0)
      existsConversations = await this._conversationRepository.findById(
        conversationId
      );

    if (receiverId && !existsConversations)
      existsConversations =
        await this._conversationRepository.findConversationByParticipantsIds(
          senderId,
          receiverId
        );

    if (!existsConversations && !receiverId && !conversationId)
      throw new AppError(
        "Precisa Selecionar um usuario valido para iniciar uma conversa"
      );

    if (!existsConversations)
      existsConversations = await this._conversationRepository.create({
        senderId,
        receiverId,
      });

    let message = await this._messageRepository.create({
      senderId,
      receiverId: receiverId || existsConversations.receiverId,
      conversationId: existsConversations.id,
      content,
      type,
    });

    await this._conversationRepository.updateLastMessage({
      idLastMessage: message.id,
      idConvesation: existsConversations.id,
    });

    return message;
  }
}

export default SendMessage;

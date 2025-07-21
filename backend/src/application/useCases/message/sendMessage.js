import AppError from "../../../shared/errors/appErros.js";

class SendMessage {
    constructor(messageRepository, conversationRepository) {
        this._messageRepository = messageRepository;
        this._conversationRepository = conversationRepository;
    }
    async send({ starterId, receiverId, content, type, conversationId }) {

        if (!this._conversationRepository.existsConversationByID(conversationId))
            throw new AppError("Conversa não encontrada");

        let message = await this._messageRepository.create({
            starterId,
            receiverId,
            content,
            type
        });

        await this._conversationRepository.updateLastMessage({
            idLastMessage: message.id,
            idConvesation: conversationId
        });
    }
}

export default SendMessage;
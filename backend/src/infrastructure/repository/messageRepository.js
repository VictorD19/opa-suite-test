import Message from "../../domain/message.js";

class MessageRepository {
  constructor(model) {
    this._model = model;
  }

  async create({
    id,
    type,
    content,
    senderId,
    receiverId,
    conversationId,
    read,
  }) {
    const message = await this._model.create({
      id,
      type,
      content,
      senderId,
      receiverId,
      conversationId,
      read,
    });
    return new Message({
      id: message._id,
      type: message.type,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId,
      conversationId: message.conversationId,
      read: message.read,
      createdAt: message.createdAt,
    });
  }

  async GetAllMessagesByConversationId(id) {
    let listMessages = await this._model.find({ conversationId: id }).exec();
    return listMessages.map(
      (message) =>
        new Message({
          id: message._id,
          content: message.content,
          read: message.read,
          type: message.type,
          createdAt: message.createdAt,
          conversationId: message.conversationId,
          receiverId: message.receiverId,
          senderId: message.senderId,
        })
    );
  }

  async GetAllMessagesByParticipants(senderId, receiverId) {
    const messages = await this._model
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 })
      .exec();

    return messages.map((message) => {
      return new Message({
        id: message._id,
        content: message.content,
        read: message.read,
        type: message.type,
        conversationId: message.conversationId,
        receiverId: message.receiverId,
        senderId: message.senderId._id,
        createdAt: message.createdAt,
      });
    });
  }
}

export default MessageRepository;

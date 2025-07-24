import Conversation from "../../domain/conversation.js";

class ConversationRepository {
  constructor(model) {
    this._model = model;
  }

  async create({ receiverId, senderId }) {
    const conversation = await this._model.create({
      receiverId,
      senderId,
      status: "open",
      closeAt: null,
      lastMessage: null,
    });
    return new Conversation({
      id: conversation._id,
      receiverId: conversation.receiverId,
      senderId: conversation.senderId,
      status: conversation.status,
      closeAt: conversation.closeAt,
      lastMessage: conversation.lastMessage,
    });
  }

  async findById(id) {
    const exists = await this._model.findById(id).exec();
    if (!exists) return null;
    return new Conversation({
      id: exists._id,
      lastMessage: exists.lastMessage,
      closeAt: exists.closeAt,
      senderId: exists.senderId,
      status: exists.status,
      receiverId: exists.receiverId

    });
  }

  async existsConversationByID(id) {
    return !!(await this._model.findById(id).exec());
  }

  async updateLastMessage({ idLastMessage, idConvesation }) {
    return await this._model
      .findByIdAndUpdate(
        idConvesation,
        { lastMessage: idLastMessage },
        { new: true }
      )
      .exec();
  }

  async findConversationByParticipantsIds(senderId, receiverId) {
    return await this._model.findOne({ senderId, receiverId });
  }

  async GetConversationByUser(userId) {
    let conversations = await this._model
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .populate({
        path: "lastMessage",
        select: "_id content createdAt",
      })
      .populate({
        path: "senderId receiverId",
        select: "_id name username lastSeen online",
      });
    return conversations.map((conversation) => {
      const isSender =
        conversation.senderId._id.toString() === userId.toString();

      const otherUser = isSender
        ? conversation.receiverId
        : conversation.senderId;

      return {
        id: conversation._id,
        idSender: isSender ? conversation.senderId._id : conversation.receiverId._id,
        otherUser: {
          id: otherUser._id,
          name: otherUser.name,
          username: otherUser.username,
          lastSeen: otherUser.lastSeen,
          online: otherUser.online,
        },
        lastMessage: {
          id: conversation.lastMessage?._id,
          content: conversation.lastMessage?.content,
          createdAt: conversation.lastMessage?.createdAt,
        },
      };
    });
  }
}

export default ConversationRepository;

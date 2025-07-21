class ConversationRepository {
    constructor(model) {
        this._model = model;
    }

    async create({ receiverId, starterId, status }) {
        const conversation = await this._model.create({
            receiverId,
            starterId,
            status,
            closeAt: null,
            lastMessage: null
        });
        return new Conversation({
            id: conversation._id,
            receiverId: conversation.receiverId,
            starterId: conversation.starterId,
            status: conversation.status,
            closeAt: conversation.closeAt,
            lastMessage: conversation.lastMessage
        });
    }

    async findById(id) {
        return await this._model.findById(id).exec();
    }

    async existsConversationByID() {
        return !!(await this._model.findById(id).exec());
    }

    async updateLastMessage({ idLastMessage, idConvesation }) {
        return await this._model.findByIdAndUpdate(
            idConvesation,
            { lastMessage: idLastMessage },
            { new: true }
        ).exec();
    }
}

export default ConversationRepository;
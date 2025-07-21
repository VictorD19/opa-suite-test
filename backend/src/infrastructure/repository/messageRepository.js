class MessageRepository {
    constructor() {
        this.messages = [];
    }

    async Create(message) {
        this.messages.push(message);
        return message;
    }

    async GetMessageByConversationID(conversationId) {
        return this.messages.filter(msg => msg.conversationId === conversationId);
    }
}

export default MessageRepository;
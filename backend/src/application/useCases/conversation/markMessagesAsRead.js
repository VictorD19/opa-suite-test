class MarkMessageAsRead {
    constructor(conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async Mark({ conversationId, userId }) {
        // if (!conversationId || !userId) {
        //     throw new Error("Invalid parameters");
        // }

        // const conversation = await this.conversationRepository.findById(conversationId);
        // if (!conversation) {
        //     throw new Error("Conversation not found");
        // }

        // const message = conversation.messages.find(msg => msg.userId === userId && !msg.read);
        // if (message) {
        //     message.read = true;
        //     await this.conversationRepository.update(conversation);
        // }
    }
}

export default MarkMessageAsRead;
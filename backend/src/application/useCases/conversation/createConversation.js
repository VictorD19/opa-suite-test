class CreateConversation {
    constructor(conversationRepository) {
        this._conversationRepository = conversationRepository;
    }
    async create({ receiverId, starterId }) {
        await this._conversationRepository.create({
            receiverId,
            starterId,
            status: "active",
        });
    }
}

export default CreateConversation;
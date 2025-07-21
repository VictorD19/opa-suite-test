class UpdateStateConversation {
    constructor(conversationRepository) {
        this._conversationRepository = conversationRepository;
    }
    async update({ status, idConvesation }) {
        await this._conversationRepository.updateState({
            status, idConvesation
        });
    }
}
export default UpdateStateConversation;
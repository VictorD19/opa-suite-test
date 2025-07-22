class GetConversationsByUser {
  constructor(conversationRepository) {
    this._conversationRepository = conversationRepository;
  }

  async Get(userId) {
    return await this._conversationRepository.GetConversationByUser(userId);
  }
}

export default GetConversationsByUser;

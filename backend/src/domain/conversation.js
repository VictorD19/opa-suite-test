class Conversation {
    constructor(
        {
            id,
            receiverId,
            starterId,
            status,
            createAt,
            updateAt,
            closeAt,
            lastMessage,
        }
    ) {
        this.id = id;
        this.receiverId = receiverId;
        this.starterId = starterId;
        this.status = status;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.closeAt = closeAt;
        this.lastMessage = lastMessage;
    }
}

export default Conversation;
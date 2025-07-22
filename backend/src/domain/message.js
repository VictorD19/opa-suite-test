class Message {
    constructor({ id, content, senderId, receiverId, createdAt, type, read, conversationId }) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.conversationId = conversationId
        this.read = read;
        this.createdAt = createdAt;
    }
}
export default Message;
class Message {
    constructor({ id, content, senderId, receiverId, createAt, type, read, conversationId }) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.conversationId = conversationId
        this.read = read;
        this.createAt = createAt;
    }
}
export default Message;
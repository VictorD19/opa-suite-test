import mongoose from "mongoose"

const ConversationSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    starterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null,
    },
    closeAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const ConversationModel = mongoose.model("Conversation", ConversationSchema)
export default ConversationModel
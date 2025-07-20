import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model("User", UserSchema)
export default UserModel
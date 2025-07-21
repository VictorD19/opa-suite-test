
import User from "../../domain/user.js"

class UserRepository {
    constructor(model) {
        this._model = model;
    }

    async create({
        name,
        username,
        password,
        role
    }) {
        const user = await this._model.create({
            name,
            username,
            password,
            role,
            isActive: true,
            online: false,
            lastSeen: null
        })
        return new User({
            id: user._id,
            isActive: user.isActive,
            lastSeen: user.lastSeen,
            name: user.name,
            online: user.online,
            role: user.role,
            userName: user.userName
        });
    }

    async findByID(id) {
        return await this._model.findById(id).exec();
    }

    async findByUserName(username) {
        const user = await this._model.findOne({ username }).exec()
        if (!user)
            return null

        return new User({
            id: user._id,
            isActive: user.isActive,
            lastSeen: user.lastSeen,
            name: user.name,
            online: user.online,
            role: user.role,
            userName: user.username,
            password: user.password
        });
    }

    async existUserByUserName(username) {
        let exists = await this._model.findOne({ username }).exec()
        return exists != null
    }

    async isActive(id) {
        return await this._model.find({ id, isActive: true })
    }

}

export default UserRepository;
import User from "../../domain/user.js";

class UserRepository {
  constructor(model) {
    this._model = model;
  }

  async create({ name, username, password, role }) {
    const user = await this._model.create({
      name,
      username,
      password,
      role,
      isActive: true,
      online: false,
      lastSeen: null,
    });
    return new User({
      id: user._id,
      isActive: user.isActive,
      lastSeen: user.lastSeen,
      name: user.name,
      online: user.online,
      role: user.role,
      createdAt: user.createdAt,
      userName: user.userName,
    });
  }

  async findByID(id) {
    const existUser = await this._model.findById(id).exec();
    if (!existUser) return null;
    return new User({
      id: existUser._id,
      online: existUser.online,
      name: existUser.name,
      username: existUser.username,
      lastSeen: existUser.lastSeen,
      isActive: existUser.isActive,
    });
  }

  async findByUserName(username) {
    const user = await this._model.findOne({ username }).exec();
    if (!user) return null;

    return new User({
      id: user._id,
      isActive: user.isActive,
      lastSeen: user.lastSeen,
      name: user.name,
      online: user.online,
      role: user.role,
      username: user.username,
      password: user.password,
    });
  }

  async existUserByUserName(username) {
    let exists = await this._model.findOne({ username }).exec();
    return exists != null;
  }

  async existUserById(id) {
    let exists = await this._model.findById(id).exec();
    return exists != null;
  }

  async isActive(id) {
    return await this._model.find({ id, isActive: true }).exec();
  }

  async updateUserOnlineStatus(id, isOnline) {
    return await this._model
      .findByIdAndUpdate(id, { online: isOnline }, { new: true })
      .exec();
  }

  async updateLastSeenById(id) {
    return await this._model
      .findByIdAndUpdate(id, { lastSeen: new Date() }, { new: true })
      .exec();
  }

  async findAll(idUser) {
    let allUsers = await this._model.find({
      _id: {
        $ne: idUser
      }
    }).exec();
    return allUsers.map(
      ({ _id, name, username, online, lastSeen }) =>
        new User({
          id: _id,
          name,
          username,
          online,
          lastSeen,
        })
    );
  }
}

export default UserRepository;

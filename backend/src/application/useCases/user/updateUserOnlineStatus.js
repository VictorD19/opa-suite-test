import AppError from "../../../shared/errors/appErros.js";

class UpdateUserOnlineState {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async update(userId, isOnline) {
    if (!(await this.userRepository.existUserById(userId)))
      throw new AppError("Usuario não existente");

    await this.userRepository.updateUserOnlineStatus(userId, isOnline);
  }
}

export default UpdateUserOnlineState;

class UpdateUserLastSeen {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async update(userId) {
    if (!(await this.userRepository.existUserById(userId)))
      throw new AppError("Usuario não existente");

    await this.userRepository.updateLastSeenById(userId);
  }
}

export default UpdateUserLastSeen;

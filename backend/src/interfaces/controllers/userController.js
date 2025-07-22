class UserController {
  constructor(findUser, getAllUsers) {
    this._findUser = findUser;
    this._getAllUsers = getAllUsers;
  }

  async GetUser(request, response) {
    response.json(request.user);
  }

  async GetDetailsReceiverUser(request, response) {
    try {
      response.json(await this._findUser.find(request?.params?.id));
    } catch (error) {
      if (error instanceof AppError)
        return response.status(error.statusCode).json({ erro: error.message });

      return response.status(400).json({
        erro: "Ocorreu um erro ao tentar obter os detalhes do usuario",
      });
    }
  }

  async GetAllUser(request, response) {
    try {
      response.json(await this._getAllUsers.get());
    } catch (error) {
      if (error instanceof AppError)
        return response.status(error.statusCode).json({ erro: error.message });

      return response.status(400).json({
        erro: "Ocorreu um erro ao tentar obter os usuario",
      });
    }
  }
}

export default UserController;

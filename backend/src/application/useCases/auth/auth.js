import AppError from "../../../shared/errors/appErros.js";

class Auth {
    _repositoryUser;
    _cryptoService;
    constructor(repositoryUser, cryptoService) {
        this._repositoryUser = repositoryUser
        this._cryptoService = cryptoService
    }

    async Authenticate({ username, password }) {
        const existUser = await this._repositoryUser.findByUserName(username)
        if (!existUser) throw new AppError("Usuario não encontrado")

        const isValid = await this._cryptoService.compare(password, existUser.password);
        if (!isValid) throw new AppError('Senha inválida');

        delete existUser.password;
        return existUser
    }

}

export default Auth
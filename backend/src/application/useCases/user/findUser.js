import AppError from "../../../shared/errors/appErros.js";

class FindUser {
    _repositoryUser;
    constructor(repositoryUser) {
        this._repositoryUser = repositoryUser;
    }

    async find(id) {
        const existUser = await this._repositoryUser.findByID(id)
        if (!existUser)
            throw new AppError("Usuario não encontrado", 401)
        return existUser;
    }
}

export default FindUser;

import { userSchema } from "../../../application/schema/userSchema.js";
import AppError from "../../../shared/errors/appErros.js";

class CreateUser {
    _repositoryUser;
    _cryptoService;
    constructor(repositoryUser, cryptoService) {
        this._repositoryUser = repositoryUser;
        this._cryptoService = cryptoService;
    }

    async create(userData) {
        const result = userSchema.safeParse(userData);

        if (!result.success)
            throw new AppError(result.error.errors[0].message);

        const { name, username, password } = result.data;
        if (await this._repositoryUser.existUserByUserName(username))
            throw new AppError("Nome de usuario já esta em uso");

        return await this._repositoryUser.create({
            name,
            username,
            password: await this._cryptoService.hash(password),
            online: true,
            role: "user",
            lastSeen: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        });

    }
}

export default CreateUser;

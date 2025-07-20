import AppError from "../../shared/errors/appErros.js";

class AuthController {

    constructor(userCreate) {
        this._useCreate = userCreate
    }

    async Register(request, response) {
        try {
            const user = await this._useCreate.create(request.body)
            return response.status(201).json(user)

        } catch (error) {
            if (error instanceof AppError)
                return response.status(error.statusCode).json({ erro: error.message })

            return response.status(400).json({ erro: "Ocorreu um erro ao tentar registrar o usuario" })
        }
    }

    async Login(request, response) {
        response.json({ message: "Login feito com sucesso", user: request.user });
    }

    async Logout(req, res) {
        req.logout(err => {
            if (err) return res.status(500).json({ error: "Erro ao sair" });
            res.json({ message: "Logout realizado com sucesso" });
        });
    }


}

export default AuthController;
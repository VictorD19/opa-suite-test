
class GetAllUsers {
    _repositoryUser;
    constructor(repositoryUser) {
        this._repositoryUser = repositoryUser;
    }

    async get(idUser) {
        return await this._repositoryUser.findAll(idUser);
    }
}

export default GetAllUsers;

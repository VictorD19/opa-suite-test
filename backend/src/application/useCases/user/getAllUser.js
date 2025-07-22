
class GetAllUsers {
    _repositoryUser;
    constructor(repositoryUser) {
        this._repositoryUser = repositoryUser;
    }

    async get() {
        return await this._repositoryUser.findAll();
    }
}

export default GetAllUsers;

import bcrypt from 'bcrypt';

class CryptoService {
    constructor() { }

    async compare(password, hashPasswordUser) {
        return await bcrypt.compare(password, hashPasswordUser);
    }

    async hash(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}

export default CryptoService
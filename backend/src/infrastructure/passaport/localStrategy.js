import { Strategy as LocalStrategy } from "passport-local";

import AuthUserCase from "../../application/useCases/auth/auth.js"
import UserRepository from "../repository/userRepository.js";
import UserModel from "../models/userModel.js";
import CryptoService from "../services/crytoServices.js";
import FindUser from "../../application/useCases/user/findUser.js";
import AppError from "../../shared/errors/appErros.js";

const userRepository = new UserRepository(UserModel)
const authUseCase = new AuthUserCase(userRepository, new CryptoService());
const findUser = new FindUser(userRepository);

export function configurePassport(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await authUseCase.Authenticate({ username, password });
                return done(null, user);
            } catch (err) {
                if (err instanceof AppError)
                    return done(null, false, { message: err.message });
                return done({message: err.message});
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUser.find(id);
            done(null, {
                id: user.id,
                name: user.name,
                username: user.username,
            });
        } catch (error) {
            return done(null, false);
        }
    });
}

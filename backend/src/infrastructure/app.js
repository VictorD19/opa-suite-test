
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import swagerUI from "swagger-ui-express";
import swaggerSpec from "../swagger/swagger.js";
import routes from "../interfaces/routes/index.js"
import { configurePassport } from "./passaport/localStrategy.js";


const app = express();
dotenv.config();

const allowedOrigins = [
    process.env.URL_FRONT_END,
    "http://localhost:3000",
];

console.log("url server",allowedOrigins)
console.log("secre",process.env.SECRET_KEY_AUTH)
const sessionMiddleware = session({
    secret: process.env.SECRET_KEY_AUTH,
    resave: false,
    saveUninitialized: false,
})
app.use(sessionMiddleware);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
app.use(
    cors({
        credentials: true,
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    })
);

app.use("/api", routes)
app.use('/docs', swagerUI.serve, swagerUI.setup(swaggerSpec));


export { app, sessionMiddleware };

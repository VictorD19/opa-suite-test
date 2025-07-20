import app from "./app.js";
import { IniciarDBMongo } from "./database/mongo.js";

const server = async () => {
    await IniciarDBMongo()
    return app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

server()
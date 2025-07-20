import mongoose from 'mongoose'
let mongooseDB;
const IniciarDBMongo = async () => {
    try {
        mongooseDB = await mongoose.connect(process.env.URI_DB_MONGO)
        console.log('MongoDB Conectado...')
    } catch (error) {
        console.log(`Conecion Faild ${error}`)
    }
}

export {
    IniciarDBMongo,
    mongooseDB
}
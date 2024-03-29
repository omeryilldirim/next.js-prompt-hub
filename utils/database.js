import mongoose, { set } from "mongoose";
let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('using existing database connection')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptHub',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
    } catch (error) {
        console.log('Error connecting to database: ', error);
        throw error;
    }
}
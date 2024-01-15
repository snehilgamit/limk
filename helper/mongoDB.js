import mongoose from "mongoose";

const ConnectDB = async() =>{
    await mongoose.connect(process.env.MongoURI)
}
export default ConnectDB;
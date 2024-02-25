import mongoose from "mongoose";

const ConnectDB = async() =>{
    await mongoose.connect(process.env.MongoURI,{dbName:"linkShortner"})
}
export default ConnectDB;
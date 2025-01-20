import mongoose from "mongoose";

const ConnectDB = async() =>{
    try{
        await mongoose.connect(process.env.MongoURI,{dbName:"linkShortner"})
    }catch(e){
        console.log("Error occured",e)
    }
}
export default ConnectDB;
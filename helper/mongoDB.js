import mongoose from "mongoose";

const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://mayank:mayank@cluster0.mssu5rq.mongodb.net/?retryWrites=true&w=majority')
}
export default ConnectDB;
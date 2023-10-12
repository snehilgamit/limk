import { models , model , Schema} from "mongoose";

const shortnerSchema = new Schema({
    link:String,
    Shortlink:String,
},{
    versionKey: false
});

const shortner = models.shortner || model("shortner" , shortnerSchema);
export default shortner;
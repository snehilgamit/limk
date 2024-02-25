import { models, model, Schema } from "mongoose";

const shortnerSchema = new Schema({
    link: String,
    Shortlink: String,
    count: {
        type: Number,
        default: 0
    },
    username:{
        type:String
    },
    openedBy:{
        type:Array,
        default:[]
    }
}, {
    versionKey: false
});

const shortner = models.shortner || model("shortner", shortnerSchema);
export default shortner;
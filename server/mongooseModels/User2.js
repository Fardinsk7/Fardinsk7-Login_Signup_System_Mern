import mongoose from "mongoose";

export const UserSchema2 = new mongoose.Schema({
    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },tags:{
        type:String,
        default:"General"
    }
})


export default mongoose.model.Users || mongoose.model("User2",UserSchema2)
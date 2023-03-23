import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    firstname:{type:String,default:""},
    username:{
        type: String,
        required:[true,"Please provide unique username"],
        uniquie:[true,"Username Exist"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique: false,
    },
    email:{
        type:String,
        required:[true,"Please provide your unique email"],
        unique:true
    },
    lastname:{type:String,default:""},
    mobileno:{type:String,default:""},
    address:{type:String},
    profile:{type:String}

})


export default mongoose.model.Users || mongoose.model("User",UserSchema)
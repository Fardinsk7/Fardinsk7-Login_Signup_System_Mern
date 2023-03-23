import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from "../config.js"

const connect = async ()=>{
    const mongodb = await MongoMemoryServer.create()
    const getUri = mongodb.getUri()
    mongoose.set("strictQuery",true)
    // const db = await mongoose.connect(getUri)
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Connection to Server Successfull")

    return db;
}

export default connect;
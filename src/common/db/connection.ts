import mongoose from "mongoose";
import { DB_URL } from "../config/config";


export async function connectionMongodb() {
    try {
        await mongoose.connect(DB_URL)
        mongoose.set("debug", true);
        console.log("Connecting db on : " + DB_URL)
    } catch (e) {
        console.log("ERROR ON CONNECT MONGODB")
        throw e
    }
}
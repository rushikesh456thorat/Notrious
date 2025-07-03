import Mongoose from "mongoose"
import {mongoDB}  from "../config/mongodbConfig.js"


export const connectToMongoDB = async() =>{

    try{
        await Mongoose.connect(mongoDB.uri)
        console.log("Successfully connected to Mongodb Server! ")
    }
    catch(err){
        console.log("Error in connecting to the MongoDb server: ",err)
    }

}

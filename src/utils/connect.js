const mongo=require("mongoose")
require("dotenv").config()
export async function connect(){
   return await  mongo.connect(process.env.LINK)
}
const mongo=require("mongoose")
const schema=require("./schema")
mongo.connect("mongodb://localhost:27017/book")
async function search(librarian,data){
    const z=mongo.model(`${librarian}_book`,schema.schema)
    const p=await z.find(data)
    console.log(p)
    return p
}
module.exports={search}
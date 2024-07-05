const mongo=require("mongoose")
const schema=require("./schema")
const mongo=require("./connect")
mongo()
async function search(librarian,data){
    const z=mongo.model(`${librarian}_book`,schema.schema)
    const p=await z.find(data)
    console.log(p)
    return p
}
module.exports={search}
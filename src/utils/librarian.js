const mongo=require("mongoose")
const schema= require("./schema")
async function add_lib(data,password){
    mongo.connect("mongodb://localhost:27017/book")
    const p=await mongo.model(`${data}_store`,schema.schema)
    const create=await mongo.model("owner_cred",schema.schema2)
    const ok=await new create({user:data,password:password})
    await ok.save()
    mongo.connection.close()
}
// module.exports=add_lib
// module.export=add_lib
async function book_store_data(store){
     mongo.connect("mongodb://localhost:27017/book")
    const p=await mongo.model(`${data}_store`,schema.schema)
    const z=await p.find()
    mongo.connection.close()
    return z
}
async function open_store(user){
    mongo.connection.close()
}
module.exports={add_lib,book_store_data,open_store}
const mongo=require("mongoose")
const schema= require("./schema")
const mongo=require("./connect")
mongo()
async function add_lib(data,password){
    mongo()
    const p=await mongo.model(`${data}_store`,schema.schema)
    const create=await mongo.model("owner_cred",schema.schema2)
    const ok=await new create({user:data,password:password})
    await ok.save()
}
// module.exports=add_lib
// module.export=add_lib
async function book_store_data(store){
    mongo()
    const p=await mongo.model(`${data}_store`,schema.schema)
    const z=await p.find()
    return z
}

module.exports={add_lib,book_store_data}
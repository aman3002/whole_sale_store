const mongo=require("mongoose")
const schema=require("./schema")
mongo.connect("mongodb://localhost:27017/book")
const user_cred=mongo.model("user_cred",schema.schema2)
async function user_creation(users,pass){
    const exist=await user_cred.find({user:users})
    if(exist.length>0){
        console.log("username already exist")
        return
    }
    const user_issued=mongo.model(`${users}_book_issueds`,schema.schema4)
    const data= new user_cred({user: users,password:pass})
   await  data.save()
}
module.exports={user_creation} 
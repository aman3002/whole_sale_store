const mongo=require("mongoose")
const test=async()=>{await  mongo.connect("mongodb://localhost:27017/book")
const z=await mongo.connection.db.listCollections().toArray()
let p=[]
z.forEach(element => {
        if(element.name.endsWith("librarians")){
            p.push(element)
        }
    });
p.forEach(element => {
   console.log(element.name+"\n") 
});}
test()
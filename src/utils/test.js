const mongo=require("mongoose")
const mongo=require("./connect")
mongo()
const z=await mongo.connection.db.listCollections().toArray()
let p=[]
z.forEach(element => {
        if(element.name.endsWith("librarians")){
            p.push(element)
        }
    });
p.forEach(element => {
   console.log(element.name+"\n") 
});
test()
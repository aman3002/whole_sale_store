const mongo=require("mongoose")
const schema=require("./schema")
mongo.connect("mongodb://localhost:27017/book")
async function librarian_add(data,librarian){
    const book=mongo.model(`${librarian}`,schema.schema)    
    let duplicate=false
    const search=await book.find({book_name:data.book_name})
    search.forEach(element => {if(element.ISBN_No==data.ISBN_No){
        console.log("please enter unique isbn no")
        duplicate=true
        return
    }}    );
    if(duplicate){
        mongo.connection.close()
        return;
    }
    if(search.length==0){
    const ok= await new book(data)
    await ok.save()
    mongo.connection.close()
    }
    else{
        console.log("update")
        await book.updateOne({book_name:data.book_name},{$set:{count:search[0].count+1}})
        mongo.connection.close()
    }
    mongo.connection.close() 
}
async function del(name){
    await book.deleteOne({"book_name":name})
    mongo.connection.close()
}
async function connect(){
    const z=await mongo.connect("mongodb:localhost:27017/book")
}
// librarian_add({book_name:"book1",ISBN_No:12,category:"action",row_no:1,count:10,cost:50},"garg")
module.exports={connect}
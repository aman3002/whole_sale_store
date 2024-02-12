const mongo=require("mongoose")
const schema=require("./schema")
const express=require("express")
const cors = require('cors');
const data=require("./user-data")
const store=require("./librarian")
const issue=require("./issuing_book")
let shop_name="";
const app=express()
app.use(cors())
app.use(express.json())
let existed=false
let existed_owner=false
const test=async()=>{await  mongo.connect("mongodb://localhost:27017/book")
const z=await mongo.connection.db.listCollections().toArray()
let p=[]
z.forEach(element => {
        if(element.name.endsWith("stores")){
            p.push(element)
        }
    });
return p
}
const sign=mongo.model("user_creds",schema.schema2)
const own=mongo.model("owner_cred",schema.schema2)
async function signup(user,pass){
    await  mongo.connect("mongodb://localhost:27017/book")
    const pro=await sign.find({user:user})
    if(pro.length>0){
        existed=true
        return;
    }
    const field=await new sign({user:user,password:pass})
    await field.save()
    mongo.connection.close()
}
async function signupowner(user, pass) {
    try {
        // Connect to MongoDB

        // Check if user already exists
        await  mongo.connect("mongodb://localhost:27017/book")
        const pro = await own.find({ user: user });
        if (pro.length > 0) {
            existed_owner = true;
            return;
        }

        // Create a new store and save owner credentials
        const p=await mongo.model(`${user}_stores`,schema.schema)
        const field = await new own({ user: user, password: pass });
        await field.save();
    } catch (error) {
        console.error('Error during signupowner:', error);
    } finally {
        // Close the MongoDB connection
        mongo.connection.close();
    }
}

app.post("/signup_owner",async (req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    [user,pass]=[req.body.user,req.body.password]
    await signupowner(user,pass)
    if(existed==true){
        res.status(403).json({message:"username taken already"})
    }
    else{
    res.status(200).json({message:"user success"})
    }
})
app.post("/signup",async (req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    [user,pass]=[req.body.user,req.body.password]
    await signup(user,pass)
    if(existed==true){
        res.status(403).json({message:"username taken already"})
    }
    else{
    res.status(200).json({message:"user success"})
    }
})
app.post("/login",async(req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    [users,pass]=[req.body.user,req.body.password]
    const field=await sign.find({user:users})
    if(field.length==0){
        res.status(404).json({authorized:false,message:"user not exist"})
    }
    else if(field[0].password==pass){
        res.status(200).json({authorized:true,message:"login successful"})
    }
    else{
        res.status(401).json({authorized:false,message:"incorrect password"})
    }
})
app.post("/login_owner",async(req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    [user,pass]=[req.body.user,req.body.password]
    const field=await own.find({user:user})
    if(field.length==0){
        res.status(404).json({authorized:false,message:"user not exist"})
    }
    else if(field[0].password==pass){
        res.status(200).json({authorized:true,message:"login successful"})
    }
    else{
        res.status(401).json({authorized:false,message:"incorrect password"})
    }
})
app.get("/validation",async(req,res)=>{
    const p=await test()
    try {
        res.json(p);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
app.post("/get_store_data",async(req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    shop_name=req.body.store_name
    res.redirect("/data")
})
app.get("/data",async (req,res)=>{
    try{
        await  mongo.connect("mongodb://localhost:27017/book");
        const p=mongo.model(`${shop_name}`,schema.schema)
        const z = await p.find({ count: { $gt: 0 } }); // Find documents where count is greater than 0
        console.log(z)
        try{
            res.json(z)
        }
        catch(error){
            res.status(500).json({error:"internal server error"})
        }
    }catch(error){
        res.status(404).json({error:"resource not found"})

    }
})
let user_name=""
app.post("/get_user_data",async(req,res)=>{
    await  mongo.connect("mongodb://localhost:27017/book");
    user_name=req.body.user_name
    res.redirect("/data2")
})
app.get("/data2",async (req,res)=>{
    try{
        await  mongo.connect("mongodb://localhost:27017/book");
        const p=mongo.model(`${user_name}_boroweds`,schema.schema4)
        const z=await p.find()
        try{
            res.json(z)
        }
        catch(error){
            res.status(500).json({error:"internal server error"})
        }
    }catch(error){
        res.status(404).json({error:"resource not found"})

    }
})
app.post("/issue_item", async (req, res) => {
    try {
        await  mongo.connect("mongodb://localhost:27017/book");
      const { item, cost, store, user } = [req.body.item,req.body.cost,req.body.store,req.body.user];
      // Assuming issue is an asynchronous function
      const data = await mongo.model(`${store}`, schema.schema);
const data2 = await data.find();
console.log(data2,store)
if (data2 && data2.length > 0 && data2[0].count > 0) {
  await issue(item, store, cost, user, store);
  res.status(200).json({ message: "Item issued successfully" });
} else {
  res.status(400).json({ message: "ITEM NOT AVAILABLE" });
}

    } catch (error) {
      console.error("Error issuing item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
app.post("/add_item_owner",async(req,res)=>{
    try{
        await  mongo.connect("mongodb://localhost:27017/book");
    const [store,item,cost,count,category]=[req.body.store,req.body.item,req.body.cost,req.body.count,req.body.category]
    const store_name=mongo.model(`${store}_store`,schema.schema)
    const a=await new store_name({book_name:item,cost:cost,count:count,category:category})
    a.save() 
    res.status(200).json({ message: "Item added successfully" });
}
    catch(error){
        res.status(500)
    }
})
app.post("/return",async(req,res)=>{
    try{
    await mongo.connect("mongodb://localhost:27017/book")
    const [item,cost,shopname,user,isbn]=[req.body.item,req.body.cost,req.body.shop,req.body.user,req.body.isbn]
    const users=mongo.model(`${user}_boroweds`,schema.schema4)
    console.log(user)
    await users.deleteOne({ISBN_No:isbn})
    const store=mongo.model(shopname,schema.schema)
    const p= await store.find({book_name:item})
    console.log("enter")
    await store.updateOne({book_name:item},{$set:{count:p[0].count+1}})
    mongo.connection.close()
    res.status(200).json({ message: "Item returned successfully" });
}
    catch(error){
        res.status(500)
    }
})

app.listen(3001)
const schema=require("./schema")
const express=require("express")
const cors = require('cors')
const data=require("./user-data")
const session=require("express-session")
const store=require("./librarian")
const app=express()
const fs=require("fs")
const path=require("path")
const mongo=require("mongoose")
const uploadsPath = path.join(__dirname, 'uploads');
const mongos=require("./connect")
mongos.connect()
// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsPath));

function removeSpacesAndConvertToLower(str) {
    // Check if str is undefined or null
    if (!str) {
      return ''; // Return an empty string or handle the case as appropriate
    }
    
    // Replace spaces with underscores and convert to lowercase
    return str.replace(/\s+/g, '_').toLowerCase();
  }
  
  const createDirectory = (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  };
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', // Allow requests from any origin (adjust as needed)
    methods: 'GET,POST', // Allow GET and POST methods (adjust as needed)
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Specify allowed headers
}));

const formidable = require('formidable');

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm({uploadDir: path.join(__dirname, 'uploads'),
        keepExtensions: true,});
    form.parse(req, (err, fields, files) => {
        req.body=fields
        console.log(req.body,files,"ye")
        if (err) {
            console.error('Error parsing form:', err);
            res.status(500).json({ error: 'Error parsing form' });
            return;
        }

        const oldpath = files.file[0].filepath;
        const newpath = path.join(__dirname, 'uploads', req.body.name[0]);
        createDirectory(newpath)
        console.log(newpath,oldpath)
        const overall=`src/utils/uploads/${req.body.name[0]}/${files.file[0].newFilename}`
        console.log(overall)
        fs.rename(oldpath, path.join(newpath, files.file[0].newFilename), (err) => {
            if (err) {
                console.error('Error moving file:', err);
                res.status(500).json({ error: 'Error moving file' });
                return;
            }
            res.status(200).json({name:overall});
        });
    });
});

const issue=require("./issuing_book")
const passport=require("./passport")()
const routes=require("./auth")
const cookie=require("cookie-parser")
app.use(cookie())
app.post("/cookie",(req,res)=>{
    const time=1000*60
    res.cookie(req.name,req.value,{maxAge:time})
    console.log(req)
})
let shop_name=""
app.options('*', cors())
app.use(session({
    secret: 'your_secret_key', // Change this to a secure random string
    resave: false,
    saveUninitialized: false
  }))
app.use(express.json())
let existed=false
let existed_owner=false
const test=async()=>{
const z=await mongo.connection.db.listCollections().toArray()
let p=[]
z.forEach(element => {
        if(element.name.endsWith("stores")){
            p.push(element)
        }
    })
    
return p
}
// app.use(passport.initialize())
app.use("/",routes)

const sign=mongo.model("user_creds",schema.schema2)
const own=mongo.model("owner_cred",schema.schema2)
async function signup(user,pass){

    const pro=await sign.find({user:user})
    if(pro.length>0){
        existed=true
        return
    }
    const field=await new sign({user:user,password:pass})
    await field.save()
    
}
async function signupowner(user, pass) {
    try {
        // Connect to MongoDB

        // Check if user already exists
    
        const pro = await own.find({ user: user })
        if (pro.length > 0) {
            existed_owner = true
            return
        }

        // Create a new store and save owner credentials
        const p=await mongo.model(`${user}_stores`,schema.schema)
        const field = await new own({ user: user, password: pass })
        await field.save()
    } catch (error) {
        console.error('Error during signupowner:', error)
    } finally {
        // Close the MongoDB connection
        
    }
}

app.post("/signup_owner",async (req,res)=>{

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

    [user,pass]=[req.body.user,req.body.password]
    const field=await own.find({user:user})
    if(field.length==0){
        res.status(401).json({authorized:false,message:"user not exist"})
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
        res.json(p)
      } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
})
app.post("/get_store_data",async(req,res)=>{

    shop_name=req.body.store_name
    res.redirect("/data")
    

})
app.get("/data",async (req,res)=>{
    try{
    
        const p=mongo.model(`${shop_name}`,schema.schema6)
        const z = await p.find({ count: { $gt: 0 } }) // Find documents where count is greater than 0
        console.log(z,"ojomk")
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

    user_name=req.body.user_name
    res.redirect("/data2")
    

})
app.get("/data2",async (req,res)=>{
    try{
        const p=mongo.model(`${user_name}_boroweds`,schema.schema4)
        const z=await p.find()
        console.log(z,"dwewg")
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

      const [item, store, user ] = [req.body.item,req.body.store,req.body.user]
      // Assuming issue is an asynchronous function
      const data = await mongo.model(`${store}`, schema.schema6)
const data2 = await data.find({book_name:item})
console.log(data2,store)
if (data2 && data2.length > 0 && data2[0].count > 0) {
  await issue(item, store, data2[0].cost, user, store)
  res.status(200).json({ message: "Item issued successfully" })
} else {
  res.status(400).json({ message: "ITEM NOT AVAILABLE" })
}

    } catch (error) {
      console.error("Error issuing item:", error)
      res.status(500).json({ error: "Internal server error" })
    }
    

  })
  app.post('/add_item_owner', async (req, res) => {
    try {
        const [store, item, cost, count, category, file] = [req.body.store, req.body.item, req.body.cost, req.body.count, req.body.category, req.body.file];
        const store_name = mongo.model(`${store}_store`, schema.schema6);

        console.log(file,"hg");

        const newItem = new store_name({ book_name: item, cost: cost, count: count, category: category, filename: file });
        await newItem.save();

        res.status(200).json({ message: "Item added successfully" });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post("/return",async(req,res)=>{
    try{

    const [item,cost,shopname,user,isbn]=[req.body.item,req.body.cost,req.body.shop,req.body.user,req.body.isbn]
    const users=mongo.model(`${user}_boroweds`,schema.schema4)
    const z = await users.find({book_name: item, ISBN_No: isbn, shop_name: shopname});
    console.log("####################")
    console.log(z,"error")
    if(z.length>0){
    await users.deleteOne({ISBN_No:isbn})
    const store=mongo.model(shopname,schema.schema6)
    const p= await store.find({book_name:item})
    console.log("enter")
    await store.updateOne({book_name:item},{$set:{count:p[0].count+1}})
    
    res.status(200).json({ message: "Item returned successfully" })
}
else if(z.length==0){
    res.status(400).json({ message: "Item not found" })
}}
catch(error){
    res.status(500).json({ error: error.message });
}
})
app.listen(3001)
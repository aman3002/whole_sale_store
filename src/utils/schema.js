const mongo=require("mongoose")
const schema= mongo.Schema({
    book_name:{
        type:String
        ,required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true 
    },
    cost:{
        type:Number,
        required:true 
    }
} )
const schema2=mongo.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const schema3= mongo.Schema({
    book_name:{
        type:String
        ,required:true
    },
    ISBN_No:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true 
    },
    issued_to:{
        type:String
    }
} )
const schema4= mongo.Schema({
    book_name:{
        type:String
        ,required:true
    },
    ISBN_No:{
        type:Number,
        required:true,
        unique:true
    },
    cost:{
        type:Number,
        required:true 
    },
    shop_name:{
        type:String,
        required:true
    }
} )
module.exports={schema,schema2,schema3,schema4}
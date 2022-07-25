const mongoose=require('mongoose');//so this mongoose odm is used to create schema and various other things with mongodb

const userSchema=new mongoose.Schema({//so this mongoose.Schema is another object that is used to create schema into which we need to pass the schema
    
    name:{
        type: String,
        required: true
       },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable :true,
        default : () =>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    },
    userType : {
        type : String,
        required : true,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer,constants.userTypes.admin,constants.userTypes.engineer]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved
       // enum : [constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected]
    }
});

//This creation of schema and we need to export it as model.
module.exports =mongoose.model("user",userSchema);
const mongoose=require('mongoose');//so this mongoose odm is used to create schema and various other things with mongodb
const constants=require('../utils/constants')
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
        default :constants.userTypes.customer,
        enum : [constants.userTypes.customer,constants.userTypes.admin,constants.userTypes.engineer]//so enum is a data type that can have fixed set of values.
    },
    userStatus : {
        type : String,
        required : true,
        default :constants.userStatus.approved,
       enum : [constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected]
    },

    //Between user schema and the ticket there is bidirectional relationship
    //Where the user to the ticket there is one to many relationship
    
    ticketsCreated:{//So this field will be used by the customer to know which are all the tickets created by this particular user and for this we have reference as "Ticket" model
        type:[mongoose.Schema.Types.ObjectId],//so when we mention the referencing using objectId we need to say which Model(schema that is)
        ref:"Ticket"
    },
    ticketsAssigned:{//this field will be used by the Engineer to which which are all the tickets assigned to them
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Ticket"
    }



});

//This creation of schema and we need to export it as model.
module.exports =mongoose.model("user",userSchema);
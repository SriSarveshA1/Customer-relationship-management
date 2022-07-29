const mongoose = require('mongoose');
const constants=require('../utils/constants')

const ticketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ticketPriority:{//Decides how fast the ticket will be resolved
        type:Number,
        required:true,
        default:4//so the number represents the priority of the ticket
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:constants.ticketStatus.open,
        enum:[constants.ticketStatus.open,constants.ticketStatus.closed,constants.ticketStatus.blocked]
    },
    reporter:{//says which user has raised this ticket
        type:String,
        required:true
    },
    assignee:{//there can be a situation where this particular ticket is assigned with any Engineer.
        type:String
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
    }
},{versionKey:false})//so when we give this the __v is not created by the mongoose

module.exports=mongoose.model("Ticket",ticketSchema);
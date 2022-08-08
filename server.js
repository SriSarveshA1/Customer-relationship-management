const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");//so here the bodyParser helps us converting from the json object to the js object and vice versa in the communication
const mongoose = require('mongoose');//we require this to make a connection to the mongodb server.
const dbConfig=require("./configs/db.config");//we have stored the mongodb url inside this and we are just importing it here.
const User= require("./models/user.model");//so here we are importing the User model
const bcrypt= require("bcryptjs");

/*
  Register the body parser middleware.
*/
app.use(bodyParser.json());//so the body that we passed while requesting needed to be parsed and (json object that we passed is parsed.)
app.use(bodyParser.urlencoded({ extended:true }));//So some times the request data will be shared along with the url and that is parsed using this .Extended:true (It parses all types of datatypes(inculding speacial characters) ,if we keep Extended:false then only the string will be parsed)


//Initialize the connection to the mongoDB.(The below method tries to deliver the results very fast ,)
mongoose.connect(dbConfig.DB_URL);//so after this line the ,previously imported line which has mongoose object has connection object attached to it.
const db=mongoose.connection;//so we are just storing the mongoose.connection into this db variable.
db.on("error",()=>{
    //when the error event has occured
   console.log("Error while connecting to the Mongodb")
});
//once is used to listen to the connection event.
db.once("open",async ()=>{
    //when the connection to the mongodb is opened.
    console.log("Connected to Mongodb")
   
    init();//so once the mongodb is connected we need to create this user
});




//Creating the ADMIN user during the BOOT time of the application
async function init(){//This init() function will be called whenever the server gets restarted.
   try{
    /*
       check if there is already a user who is admin (we want only one admin to be present).
    */
   
    let user=await User.findOne({userId:"admin"});
    
    if(user){
     //if the user is already present(this user will be having some value);
     console.log("ADMIN user is already present");
     console.log("admin user = " + user);
     return;
    }
     user=await User.create({//we are creating the admin user 
     name:"SriSarvesh.R",
     userId:"admin",
     password:bcrypt.hashSync("Welcome1",8),
     email:"r.srisarvesh@gmail.com",
     userType:"ADMIN"
    });
    console.log("admin user= "+user);
   }
   catch(err){
         console.log("Error happenned = "+err.message)
   }
}









//We need to connect router to the server
require("./routes/auth.route")(app);

require("./routes/user.route")(app);

require("./routes/ticket.route")(app);


app.listen(serverConfig.PORT,()=>{
    console.log("Started on the server port "+serverConfig.PORT);
})

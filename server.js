const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");//so here the bodyParser helps us converting from the json object to the js object and vice versa in the communication

/*
  Register the body parser middleware.
*/
app.use(bodyParser.json());//so the body that we passed while requesting needed to be parsed and (json object that we passed is parsed.)
app.use(bodyParser.urlencoded({ extended:true }));//So some times the request data will be shared along with the url and that is parsed using this .Extended:true (It parses all types of datatypes(inculding speacial characters) ,if we keep Extended:false then only the string will be parsed)

app.listen(serverConfig.PORT,()=>{
    console.log("Started on the server port "+serverConfig.PORT);
})

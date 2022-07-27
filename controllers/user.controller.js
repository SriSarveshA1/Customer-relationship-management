/*
This is the controller for the user Resource
*/
const User=require("../models/user.model")
const ObjectConverter=require("../utils/objectConvertor");
//Get the list of all the users
exports.findAll=async (req,res)=>{
   try{
    const users=await User.find();//so since we are not passing any conditions all the users will be retrived and it will be stored in the users.

     res.status(200).send(ObjectConverter.userResponce(users));
   }
   catch(err){
          console.log(err);
          res.status(500).send({message:err.message})
   }
   
}
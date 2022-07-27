/*
This is the controller for the user Resource
*/
const User=require("../models/user.model")
const ObjectConverter=require("../utils/objectConvertor");
//Get the list of all the users
exports.findAll=async (req,res)=>{
   //Then while finding the user related information the admin wants to find the user based on some filters 
   //for that they may pass the query parameters
   const queryObj={};
   //we try to read the optional query parameters and put them into this query object
   const userTypeQP=req.query.userType;
   const userStatusQP=req.query.userStatus;
   if(userTypeQP)
   {
      queryObj.userType=userTypeQP;
   }
   if(userStatusQP)
   {
      queryObj.userStatus=userStatusQP;
   }
   try{
    const users=await User.find(queryObj);//so since we are not passing any conditions all the users will be retrived and it will be stored in the users.

     res.status(200).send(ObjectConverter.userResponce(users));
   }
   catch(err){
          console.log(err);
          res.status(500).send({message:err.message})
   }
   
}
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
      //so if the both the query param is not passed the queryObj={} 
    const users=await User.find(queryObj);//so since we are not passing any conditions all the users will be retrived and it will be stored in the users.

     res.status(200).send(ObjectConverter.userResponce(users));
   }
   catch(err){
          console.log(err);
          res.status(500).send({message:err.message})
   }
   
}

//This method will return the user details using the id passed in parm 
exports.findByUserId=async (req,res)=>{

   try{
      const user=await User.find({userId:req.params.id});
      //so the user will be having an [] but only one object which is having multiple properties that are not useful ,so we need to retrive only the useful properties
      var obj=ObjectConverter.userResponce(user);
      return res.status(200).send(obj);
   }
   catch(err)
   {
      res.status(500).send({message:err.message})
   }
  
}

exports.update=async (req,res)=>{
   //So the user info on which we want to perform updation the userId needs to be in the parameter.

   try{
     const user=await User.findOne({userId:req.params.id});
     //so we can make certain user details to be updated
     //userStatus,name,userType
     //so if these fields are provided in the body then we update them or else we keep the old values.
     user.userStatus =req.body.userStatus != undefined ? req.body.userStatus:user.userStatus;
     user.name=req.body.name != undefined ? req.body.name:user.name;
     user.userType=req.body.userType != undefined ? req.body.userType:user.userType;

     const updatedUser=await user.save();//db operation to update/save the updated changes
     console.log(updatedUser)
     var obj={
      name:updatedUser.name,
      userId:updatedUser.userId,
      email:updatedUser.email,
      userType:updatedUser.userType,
      userStatus:updatedUser.userStatus
     }
     return res.status(200).send(obj);

   }
   catch(err){
      return res.status(500).send({message:err.message})
   }
}
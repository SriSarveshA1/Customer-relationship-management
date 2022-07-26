//This file will have the logic to validate the incoming request.

const User=require("../models/user.model");
const constants=require("../utils/constants"); 

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignUpRequestBody=async (req,res,next)=>{
    //validate the name 
    if(!req.body.name)
    {
        return res.status(400).send({message:"User name is not specified"})
    }
    //validate the userId is present and it should not be duplicate
    if(!req.body.userId)
    {
        return res.status(400).send({message:"UserId is not specified"})
    }
    try{
        var user=await User.findOne({userId:req.body.userId});
        if(user)
        {
            return res.status(400).send({message:"User already exists with the given UserId"})
        } 
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
    //Validate the password is valid (follow certain constraints)
    if(!req.body.password)
    {
      return res.status(400).send({message:"Password is not provided"});   
    }
    //Validate the email is present and it should not be duplicate
    if(!req.body.email)
    {
        return res.status(400).send({message:"Email is not specified"})
    }

    if(!isValidEmail(req.body.email))
    {
         return res.status(400).send({message:"Email is not valid needed to follow the constraints"}); 
    }

    //validate if the userType is present and should be either (Customer,Engineer)
    if(!req.body.userType) {
        return res.status(400).send({message:"User type is not present"});
    }
                    //  == "ADMIN"
    if(req.body.userType==constants.userTypes.admin)
    {
        return res.status(400).send({message:"ADMIN registration is not allowed from the user "});
    }
    
    const userTypes=[constants.userTypes.engineer,constants.userTypes.customer];

    if(!userTypes.includes(req.body.userType))
    {
        return res.status(400).send({message:"User type that is provided is not valid it should be either CUSTOMER || ENGINEER"});
    }


    next();//if everything is fine we go to the next middleware

}

const validateSignInRequestBody= (req,res,next) => {
    if(!req.body.userId)
    {
        return res.status(400).send({message:"UserId is not specified"})
    }
    if(!req.body.password)
    {
      return res.status(400).send({message:"Password is not provided"});   
    }
    next();

}
module.exports={
    validateSignUpRequestBody,
    validateSignInRequestBody
}
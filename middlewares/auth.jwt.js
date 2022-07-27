const jwt=require("jsonwebtoken");
const authConfig=require("../configs/auth.config");
const User=require("../models/user.model");
const constants=require("../utils/constants");

const verifyToken=(req,res,next) => {
    const token=req.headers["x-access-token"];//so in the headers (as key we give x-access-token and as a value we pass the token) along with the api request call

    //check if the token is present
    if(!token){
        //if the token is not present 
        //403 is referring to unauthorized request(forbidden)
        return res.status(403).send({message:"No token is provided"});
    }
    //go and validate the token
    //While creating the token we passes the user_id,secretcode ,to verify the token we need to pass secretcode and user_id is already present in the token as id.
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        //so once the token is verified 
        //Err if there is a problem while verifying
        if(err)
        {
            return res.status(401).send({message:"Unauthorized!"})
        }
        //Read the value of the token id(which is a public info) from the token and set that info into the request object
        req.userId=decoded.id;//so decoded object has the id info using which we created this token.
        next();
    })
}
const isAdmin=async (req,res,next) => {
        //req.userId contains the userId that we retrived from the token.
       
       const user=await User.find({userId:req.userId});
       if(user&&(user.userType == constants.userTypes.admin))
       {
            next();
       }
       else{
         return res.status(403).send({message:"You are unauthorized to perform this action"})
       }
}

const isValidUserIdInReqParams = async (req,res,next)=>{
      try{
           const user=await User.find({userId:req.params.id});
           if(!user)
           {
              return  res.status(400).send({message: 'User Id passed is not found'})
           }
           else{
            next();
           }
      }
      catch(err){
        res.status(500).send({message:err.message});
      }
}

const isAdminOrOwner=async (req,res,next)=>{
    try{
        const user=await User.findOne({userId:req.params.id});
        const loggedInUser=await User.findOne({userId:req.userId});  
      
        if((loggedInUser.userType==constants.userTypes.admin)||(user.userId==req.params.id))
        {
            next();
        }
        else{
          return res.status(403).send({message:"You are unauthorized to perform this action only admin or owner of this userId can do this action"});
        }
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}
module.exports={
    verifyToken,
    isAdmin,
    isValidUserIdInReqParams,
    isAdminOrOwner
}
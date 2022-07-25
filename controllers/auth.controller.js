
/*
This file will contain the logic for the registration of the user and the login of the user.

So there will be 3 types of Users:
1.customer.
2.Engineer.
3.Admin.

And for each User type there are certain user Status allocated for them
 1.Approved
 2.Pending.
 3.Rejected.

 Customer:
   1.So the user who's type is customer should be able to be register and set to "Approved" status by default.
   2.And after registering they should be able to login immediately.And do what ever activities that we want to perform on the application.

 Engineer:
   1.Should be able to register.
   2.Initially(by default) the engineer will be in the "Pending" status (That they will be initially able to login into the application)
   4.So the Admin needs to look into the engineer and then the admin should be able to Approve the Engineer (Based on the issues the Engineer needed to fix).
   5.So once the Engineer gets the Approved status he can be able to "login" perform all the activities on the application

  Admin:
   1.ADMIN type of user should be able to be created only from the backend team (And no API call should perform this creation of User with "Admin" previlage)

*/ 
const bcrypt=require("bcryptjs");
const User=require("../models/user.model");//so the User model that we created we are just importing it
/*
So here the Signup and signin logic should be implemented in a function 
*/

exports.signup=async (req,res)=>{
    //so when a user is trying to register we try to execute this method.
    /*
      I need to read the data from the request body that we passed.
    */
     if(req.body.userType!="CUSTOMER")
     {
        //so the request body that we passed has a userType !=customer(Then it will be Engineer) so for that we want the userStatus to be PENDING ,so the Admin user should change this user status.
        req.body.userStatus = "PENDING";

     }
    /*  
      Convert that into JS object for inserting into the mongoDb.
    */
     const userObj={
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,8),//so the 8 (length) it is the cost factor that it figures out the length of the hashed string if its length is more then the security & space will also increase,if its less then security&space will also go down.
        userStatus:req.body.userStatus
     }
     

    /*
      Then we insert the data and return the response.
    */
   try{
    const userCreated=await User.create(userObj);//this create function is done asyncronously
    //here we need to return the newly created user as a responce.(Without password,_v,,_id fields)

    const response={ //so we are just creating our own responce object
        name:userCreated.name,
        userId:userCreated.userId,
        email:userCreated.email,
        userType:userCreated.userType,
        userStatus:userCreated.userStatus,
        createdAt:userCreated.createdAt,
        updatedAt:userCreated.updatedAt
    }
    res.status(201).send(response);

   }
   catch(err){
    console.log(err.message)
    res.status(500).send({message:"Internal Server Error"});
   }
  
    
}

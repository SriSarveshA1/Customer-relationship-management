
const User=require("../models/user.model");
const Ticket=require("../models/ticket.model");
const constants=require("../utils/constants");

const isValidOwnerOftheTicket=async (req,res,next)=>{
    //so if the user is only customer then we can update only the tickets created by the customer
    //so if the user is engineer then we need to update the tickets created by them and also assigned to them.
    //so if the user is admin he can do both.
    const user=await User.findOne({userId:req.userId});
    const ticket=await Ticket.findOne({_id:req.params.id});
    
    if(user.userType ==constants.userTypes.customer)
    {
         const ownerId=ticket.reporter;//this will give the userId of the user who created the ticket.

         if(user.userId!=ownerId)//it means this customer is not the owner of the ticket
         {
            return res.status(403).send({message:"You have to be the owner of the ticket or admin or the engineer assigned to this ticket to view"})
         }
    }
    else{
        if(user.userType==constants.userTypes.engineer)
        {
            const ownerId=ticket.reporter;
            const engineerId=ticket.assigne;
            //so the user should be either the owner of the ticket or the engineer to whom the ticket is assigned to.
            if(user.userId!=ownerId&&user.userId!=engineerId)
            {
              
                return res.status(403).send({message:"You have to be the owner of the ticket or admin or the engineer assigned to this ticket to view"});
            }
        }

    }
    /*
          If the update requires the change in the assignee
           1.Only the admin should be allowed do this.
           2.And assignee should be the valid user.
          
    */
    if(req.body.assignee==ticket.assignee)//so even if someone passes the assignee but if its only changed from the previously given value then only we return error.or else we move 
    {
        next();//so even if its not admin without changing the admin value anyone can give the update content.
    }
    else{
        if(req.body.assignee!=undefined && user.userType!=constants.userTypes.admin)
        {
        
              //so if the person is trying to make change in the assignee but the user is not admin then we should say you are not allowed to change
              return res.status(403).send({message:"Only admin is allowed to reassign the ticket"})
         
         
        }
        
        //if the user is admin then we try to find the assignee(Engineer) is a valid one.
        if(req.body.assignee!=undefined )
        {
         const engineer =await User.findOne({userId:req.body.assignee});
        
         if(!engineer) {
          //if the engineer is not present then we try to return error
          return res.status(403).send({message:"The Engineer(who is said to be assignee) is not a valid engineer so provide the proper userId"});
         }
         else{
         
          next();
          
         }
        }
        else{
        
         next();
        
        }
    }
    
   
   
    


}
module.exports ={
    isValidOwnerOftheTicket
}
//this file has logic to work with the Ticket model.

//Method to create logic of creating tickets.
/*
 *  1.Any authenticated user should be able to create the Ticket (And middleware should check whether the user is authenticated or not) 
 *  2.Ensure the request body has valid data to create the Ticket (This needs to be taken care by the middleware)
 *  4.After the ticket is been created,Ensure the customer and Engineer documents are also updated accordingly.
 */

const User=require("../models/user.model");
const Ticket=require("../models/ticket.model");
const constants=require("../utils/constants");
//so this particular file is used to send the POST request the notification app.
const notificationClient=require("../utils/notificationClient");


exports.createTicket=async (req,res)=>{
    //read from the request body and create the ticket object

    const ticketObj={
        title:req.body.title,
        ticketPriority:req.body.ticketPriority,
        description:req.body.description,
        status:req.body.status,
        reporter:req.userId//so the person who is logged in into the application (from the token we get the persons userId which is stored in the request)
    };
    //Find the Engineer available and attach to the ticket object
    //so we need to find the engineer who is in the "APPROVED" state
    try{
        const engineer =await User.findOne({
            userStatus:constants.userStatus.approved
           ,userType:constants.userTypes.engineer
        });
        
        if(engineer)
        {
            ticketObj.assignee=engineer.userId;//so for the ticket that we created we assign the engineer who is available
        }
        /*
       Insert the  ticket object
           1.Insert the ticketId into the customer and Engineer document.
       */
       const ticketCreated=await Ticket.create(ticketObj);

       if(ticketCreated)
       {
        //we update the customer and Engineer document
        const customer= await User.findOne({userId:req.userId});//so we try to retrive the user who create the ticket 
        customer.ticketsCreated.push(ticketCreated._id);//and that retrived user have some ticketsCreated array in that we push this ticketObj
        await customer.save();//then we try to save the updated change

        //update the engineer document
        if(engineer)
        {
            engineer.ticketsAssigned.push(ticketCreated._id);
            await engineer.save();//then we try to save the updated change
        }
        notificationClient(`The ticket has been successfully created with id ${ticketCreated._id}`,`Customer with userId ${ticketObj.reporter} complaint has been registered`,`${customer.email},${engineer.email},r.srisarvesh@gmail.com`,"CRM APP");//"CRM APP" is the requester for the notification service to send the mail
        res.status(201).send(ticketCreated);
       }
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
   
}
//Getting all the tickets.
exports.getAllTickets=async (req,res)=>{
    //so we need to find the userType depending on that we need to frame the search query

    try{
        const user=await User.findOne({userId:req.userId});
        const queryObj={};
        const ticketsCreated=user.ticketCreated;
        const ticketsAssigned=user.ticketAssigned;
    
        if(user.userType==constants.userTypes.customer)
        {
            //querying for fetching all the tickets created by the user alone
            const ticketsCreated = await User.ticketsCreated;//so from the db we are retriving the array length so it is async process
            if(!ticketsCreated)
            {
                //if this particular user doesn't raise any ticket then this array will be empty and
                return res.status(200).send({message:"No tickets were created by this user"});
            }
            queryObj["_id"]={ $in : ticketsCreated };//so which means the we want { _id : { $in: ticketsCreated } } so the ticketsCreated has list of _id's and we are just trying to query and get the tickets from the collection which has _id "in" the array
            
        }
        else{
            if(user.userType==constants.userTypes.engineer)
            {
                //query object for fetching all the tickets created by the user and assigned to the user.
                //so we want the ids which are either in the ticketsCreated array or in the ticketsAssigned array.
                queryObj["$or"]=[{"_id" : { $in : ticketsCreated } },{ "_id" : { $in : ticketsAssigned } } ];
    
            }
        }
        //for the userType admin the queryObj={} empty which will retrive all the tickets that is been created.
        const tickets=await Ticket.find(queryObj);
        
        res.status(200).send(tickets);
    }
    catch(err) {
        res.status(500).send({message: err.message});
    }
}

/*
  Update the ticket 
*/
exports.updateTicket=async (req,res)=>{
    try{
        const ticket=await Ticket.findOne({"_id":req.params.id});

        //update the ticket object based on the request body
        ticket.title=(req.body.title==undefined)?ticket.title:req.body.title;
        ticket.description=(req.body.description==undefined)?ticket.description:req.body.description;

        ticket.ticketPriority=(req.body.ticketPriority==undefined)?ticket.ticketPriority:req.body.ticketPriority;
        
        ticket.status=(req.body.status==undefined)?ticket.status:req.body.status;
        //So only the ADMIN can change the ticket assignee (Even this needs to be taken care in the middleware)
        ticket.assignee=(req.body.assignee==undefined)?ticket.assignee:req.body.assignee;
    
       const updatedTicket= await ticket.save();//this will save the updation.
       
       const customer=await User.findOne({userId:ticket.reporter});//This customer object  will be holding the user who is the reporter of this ticket

       const engineer=await User.findOne({userId:ticket.assignee});//this engineer object will be holding the user who is the assignee of this ticket(The engineer to whom we assigned the ticket)


       notificationClient(`The ticket with id ${ticketCreated._id} has been successfully updated`,`Ticket has been successfully updated`,`${customer.email},${engineer.email},r.srisarvesh@gmail.com`,"CRM APP");//"CRM APP" is the requester
       
       res.status(200).send(updatedTicket);
    }
    catch(err) {
        res.status(500).send({message:err.message});
    }
   
}
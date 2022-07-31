/*
Route logic for the ticket resource
*/

const ticketCollector=require("../controllers/ticket.controller")
const {authJwt} = require("../middlewares/index");
const {ticketValidator}= require("../middlewares/index");

module.exports=(app)=>{

    app.post("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketCollector.createTicket);

    app.get("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketCollector.getAllTickets);

    app.put("/crm/api/v1/tickets/:id",[authJwt.verifyToken,ticketValidator.isValidOwnerOftheTicket],ticketCollector.updateTicket);

}
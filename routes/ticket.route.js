/*
Route logic for the ticket resource
*/

const ticketCollector=require("../controllers/ticket.controller")
const {authJwt} = require("../middlewares/index");
module.exports=(app)=>{

    app.post("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketCollector.createTicket);

    app.get("/crm/api/v1/tickets/",[authJwt.verifyToken],ticketCollector.getAllTickets);
}
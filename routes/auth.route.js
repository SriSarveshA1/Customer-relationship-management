/*
This file will contains routing logic for the signup and signin
*/
const authController = require("../controllers/auth.controller");
module.exports=(app)=>{
    // POST /crm/api/v1/auth/signup
    app.post("/crm/api/v1/auth/signup",authController.signup);
    // POST /crm/api/v1/auth/signin
    app.post("/crm/api/v1/auth/signin",authController.signin);
}
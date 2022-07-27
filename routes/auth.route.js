/*
This file will contains routing logic for the signup and signin
*/
const authController = require("../controllers/auth.controller");
const {verifySignup} = require("../middlewares/index");

module.exports=(app)=>{
    // POST /crm/api/v1/auth/signup
    app.post("/crm/api/v1/auth/signup",[verifySignup.validateSignUpRequestBody],authController.signup);
    // POST /crm/api/v1/auth/signin
    app.post("/crm/api/v1/auth/signin",[verifySignup.validateSignInRequestBody],authController.signin);
}
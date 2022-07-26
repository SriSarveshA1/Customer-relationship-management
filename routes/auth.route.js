/*
This file will contains routing logic for the signup and signin
*/
const authController = require("../controllers/auth.controller");
const {validateSignUpRequestBody,validateSignInRequestBody} = require("../middlewares/verifySignup");

module.exports=(app)=>{
    // POST /crm/api/v1/auth/signup
    app.post("/crm/api/v1/auth/signup",[validateSignUpRequestBody],authController.signup);
    // POST /crm/api/v1/auth/signin
    app.post("/crm/api/v1/auth/signin",[validateSignInRequestBody],authController.signin);
}
const verifySignup=require("./verifySignup");//this verifySignup has object that holds all the middleware functions
//As we want we can add more middleware functions here and export here.
const authJwt=require("./auth.jwt")
module.exports={
    verifySignup,
    authJwt
}
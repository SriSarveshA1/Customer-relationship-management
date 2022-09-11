const userController =require("../controllers/user.controller");
const {authJwt} = require("../middlewares/index");

module.exports=(app)=>{
    //So this method will retrive all the users of this application
    app.get("/crm/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);

    //And using this route we can retrive the user information of that particular userId which is passed.(And either admin or the owner of the id can only perform this).
    app.get("/crm/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParams,authJwt.isAdminOrOwner],userController.findByUserId);

    //And either admin or the owner of the _id can update the user information.
    app.put("/crm/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParams,authJwt.isAdminOrOwner],userController.update)
}
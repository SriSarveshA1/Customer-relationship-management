const userController =require("../controllers/user.controller");
const {authJwt} = require("../middlewares/index");

module.exports=(app)=>{
    app.get("/crm/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);

    app.get("/crm/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParams,authJwt.isAdminOrOwner],userController.findByUserId);

    app.put("/crm/api/v1/users/:id",[authJwt.verifyToken,authJwt.isValidUserIdInReqParams,authJwt.isAdminOrOwner],userController.update)
}
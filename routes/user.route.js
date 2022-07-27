const userController =require("../controllers/user.controller");
const {authJwt} = require("../middlewares/index");

module.exports=(app)=>{
    app.get("/crm/api/v1/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll);
}
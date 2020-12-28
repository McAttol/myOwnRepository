const express = require("express");
const userRouterController = require("../controllers/userRouterController");

const userRouter = express.Router();

function routes(User){
    const controller = userRouterController(User);

    userRouter.use("/:passport", (req, res, next)=>{
        if(req.params && req.params.passport){
            const passportNumber = req.params.passport;
            User.findOne({passportNumber}, (error, user)=>{
                if(error){
                    res.status(404)
                    res.send("Not found")
                }else if(user){
                    req.user = user
                    next()
                }
            })
        }
    })
    userRouter
    .route("/:passport")
    .get(controller.getUser)
    .post(controller.upLoad)
    .put(controller.newUser)

    return userRouter
}

module.exports = routes;
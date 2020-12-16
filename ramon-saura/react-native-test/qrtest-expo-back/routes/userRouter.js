const express = require("express");
const userRouterController = require("../controllers/userRouterController");

const userRouter = express.Router();

function routes(User){
    const controller = userRouterController(User);
    userRouter.route("/").get(controller.getUserList);

    return userRouter
}

module.exports = routes;
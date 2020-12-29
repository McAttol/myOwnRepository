const express = require('express')
const userRouterController = require('../controllers/userRouterController')

const userRouter = express.Router();

function routes(user){
    const controller = userRouterController(user)
    userRouter.route('/').get(controller.getUsersList)

    return userRouter;
}

module.exports = routes
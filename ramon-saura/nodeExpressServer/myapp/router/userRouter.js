const express = require('express')
const userRouterController = require('../controllers/userRouterController')

const userRouter = express.Router();

function routes(User){
    const controller = userRouterController(User)
    userRouter.route('/').get(controller.getUsersList)
    userRouter.route('/:passport').get(controller.getDetail);
    return userRouter;
}

module.exports = routes
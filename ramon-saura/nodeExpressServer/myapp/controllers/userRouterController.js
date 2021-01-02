const connection = require('../config/connection')

function userController(User){
    function getUsersList(req, res){
        connection.query("SELECT * FROM users", (err, result)=>{
            if(err) throw err;
            res.json(result)
        })
    }
    return {getUsersList}
}

module.exports = userController;
const connection = require('../config/connection')

function userController(User){
    function getUsersList(req, res){
        connection.query("SELECT * FROM users", (err, result)=>{
            if(err) throw err;
            res.json(result)
        })
    }
    function getDetail(req, res){
        passport = req.params.passport;
        connection.query(`SELECT * FROM users WHERE passport='${passport}'`, (err, result)=>{
            if(err) throw err;
            res.json(result)
        })
    }
    return {getUsersList, getDetail}
}

module.exports = userController;
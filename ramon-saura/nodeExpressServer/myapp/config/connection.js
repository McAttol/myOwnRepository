const mysql = require('mysql');

function Connection (){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodeServer'
    })
}

module.exports= Connection();
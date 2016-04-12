module.exports = (function(){
    var mysql = require('mysql');

   return mysql.createConnection({
        host : 'localhost',
        port : 5888,
        user : 'root',
        password : '',
        database: 'admindb'
    });

}())
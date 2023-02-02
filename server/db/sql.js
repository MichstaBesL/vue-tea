var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',   //数据库地址
    user     : 'root',          //用户名
    password : '123456',      //密码
    database : 'tea'        //数据库名
});
module.exports = connection;
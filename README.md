# 搜索结果展示
    后端:
        安装mysql  cmd =>  npm install mysql -S
    配置:
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',   //数据库地址
            user     : 'me',          //用户名
            password : 'secret',      //密码
            database : 'my_db'        //数据库名
        });
# 引入sass
    安装下载：
        npm install node-sass@4.14 -S
        npm install sass-loader@8.x -S
    使用：
        <style scoped lang="scss"></style>
# token是后端生成的，并且token是不能重复的
    1.下载
        npm install jsonwebtoken
    2.引入
        require("jsonwebtoken")
    3.生成token语法
        jwt.sign(用户信息，口令，过期时间)
    4.解释token
        jwt.decode(token)

# token使用流程
    1.客户端使用用户名跟密码请求登录
    2.服务端收到请求，去验证用户名与密码
    3.验证成功后，服务端会签发一个token,再把这个token发送给客户端
    4.客户端收到token以后可以把它存储起来，比如放在cookie里或者localStorage
    5.客户端每次向服务商请求资源的时候需要带着服务端签发的token
    6.服务端收到请求，然后验证客户端请求里面带着的token，如果验证成功，就向客户端返回请求信息
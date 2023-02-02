const User =  {
    //先验证手机号是否存在数据库中
    queryPhone(options){
        return "select * from user where tel = "+options.userPhone+""
    },
    //验证密码是否正确
    queryPwd(options){
        return "select * from user where (tel = "+options.userPhone+" and pwd = "+options.userPwd+")"
    },
    addUser(options){
        let userPhone = options.userPhone
        let userPwd = options.userPwd || "666666"
        //引入token包
        let jwt = require("jsonwebtoken")
        //用户信息
        let user = {userPhone:options.userPhone}
        //口令
        let secret = "LDMLDMLDM"
        //生成token
        let token = jwt.sign(user,secret)
        return "insert into user(tel,pwd,iconImg,token,nickName) values('"+userPhone+"','"+userPwd+"','/images/tx.jpeg','"+token+"','张三')"
    },
    userUpData(options){
        return "update user set pwd=replace(pwd,'"+options.user.pwd+"','"+options.userPwd+"') where id="+options.user.id
    }
}
exports =  module.exports = User
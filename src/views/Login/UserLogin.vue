<template>
  <div class="login">
    <header class="header">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <span>登录</span>
        <i class="iconfont icon-home" @click="goHome"></i>
    </header>
    <section>
        <div class="from">
            <div class="input_div">
                <input type="text" v-model="userPhone" placeholder="请输入手机号" maxlength="11"> <br>
                <input type="text" v-model="userPwd" placeholder="请输入密码">
            </div>
            <button class="sublimt" @click="userLogin">登 录</button>
            <div class="login_list">
                <div @click="goUserLoginDx"><i class="iconfont icon-mima"></i>短信登录</div>
                <div @click="goRecovery"><i class="iconfont icon-mima"></i>找回密码</div>
                <div @click="goRegistered"><i class="iconfont icon-shouji"></i>快速注册</div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import http from "@/common/api/request"
import {mapMutations} from 'vuex'
export default {
    name:'login',
    data() {
        return {
            userPhone: '',
            userPwd: '',
        }
    },
    methods:{
        ...mapMutations(['USER_LOGIN']),
        goBack(){
            this.$router.back()
        },
        goHome(){
            this.$router.push({path:"/"})
        },
        goUserLoginDx(){  //跳转短信登录
            this.$router.push({
                path:"/login"
            })
        },
        goRegistered(){   //跳转注册页面
            this.$router.push({
                path:"/registered"
            }) 
        },
        goRecovery(){     //跳转找回密码页面
            this.$router.push({
                path:"/recovery"
            }) 
        },
        userLogin(){
            let phone = this.queryTel(this.userPhone)
            let pwd = this.queryPwd(this.userPwd)

            if(phone && pwd){  //当phone和pwd都为true时发送请求，验证用户 密码
                http.$axios({
                    url:'/api/userLogin',
                    method:"post",
                    params:{
                        userPhone:this.userPhone,
                        userPwd:this.userPwd
                    }
                }).then((res)=>{
                    Toast(res.msg)
                    if(!res.success) return;//是否登录成功 返回 true false

                    this.USER_LOGIN(res.data)
                    
                    setTimeout(()=>{
                        this.$router.push({
                            path:'/about'
                        })
                    },1000)
                })
            }
        },
        queryTel(tel){
            let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            let phone = reg.test(tel)
            if(!phone){
                Toast({
                    message:"请输入正确的手机号"
                })
                return false
            }else{
                return true
            }
        },
        queryPwd(pwd){
            let pwd2 = pwd.trim().length >= 6 ? true : false
            if(!pwd2) {
                Toast({message:"密码长度最少6位"})
            }
            return pwd2
        }
    }
}
</script>

<style>
.header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .625rem;
        background: #B0352F;
        height: 2.75rem;
        color: #fff;
    }
    .header i{font-size: 1.375rem;}
    .from{padding: 1.5625rem;}
    .input_div input {
        height: 2.75rem;
        border: 1px solid rgb(201, 201, 201);
        width: 100%;
        margin-bottom: 1.25rem;
        border-radius: .25rem;
        text-indent: .625rem;
    }
    .sublimt{
        background: #B0352F;
        width: 100%;
        height: 2.75rem;
        color: #fff;
        border: 0;
        border-radius: .25rem;
        font-size:1rem;
    }
    .login_list{
        margin-top: .625rem;
        display: flex;
        justify-content: space-between;
        height: 2.75rem;
        align-items: center;
    }
    .login_list div{display: flex;align-items: center;}
    .login_list i{
        font-size: 1.25rem;
        margin-right: .3125rem;
    }
</style>
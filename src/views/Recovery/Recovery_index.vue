<template>
  <div class="login">
        <header class="header">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <span>找回密码</span>
            <i class="iconfont icon-home" @click="goHome"></i>
        </header>
        <section>
            <div class="from">
                <div class="input_div">
                    <input type="text" placeholder="请输入手机号" v-model="userTel" maxlength="11"> 
                    <div>
                        <input type="text" placeholder="请输入图形验证码">
                        <span class="flex_tu">
                            <img src="/images/GetValidateCode.gif" alt="">
                        </span>
                    </div>
                    <div class="duanxin">
                        <input type="text" placeholder="请输入短信验证码" v-model="code">
                        <button @click="getCode" :disabled="disabled">{{codeMsg}}</button>
                    </div>
                </div>
                <button class="sublimt" @click="goNext">下一步</button>
            </div>
        </section>
    </div>
</template>

<script>
import {Toast} from "mint-ui"

import http from "@/common/api/request"
export default {
    data() {
        return {
            userTel: '',     //用户输入的手机号
            code: '',        //用户输入的验证码
            codeNumbe: 0,    //计时 默认等 time 的值
            time:6,          //重新获取短信的时间
            disabled:false,  //button 禁用
            codeMsg: "获取短信验证码",
            axiosCode:{},    //用户信息对象，获取验证码时保存
        }
    },
    methods:{
        goBack(){           //返回上一页
            this.$router.back()
        },
        goHome(){           //返回首页
            this.$router.push({path:"/"})
        },
        queryTel(tel) {      //查询手机号
            let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            let phone = reg.test(tel)
            if (!phone) {
                Toast({
                    message: "请输入正确的手机号"
                })
                return false
            } else {
                return true
            }
        },
        getCode() {                                   //获取短信验证码
            let tel = this.queryTel(this.userTel)   //验证手机号
            if (tel) {
                //发送请求 获取后台加密码的6位验证码
                http.$axios({
                    url: '/api/code',
                    method: "POSt",
                    params: {
                        userTel: this.userTel,
                    }
                }).then((res) => {
                    this.axiosCode = res
                    console.log(res)
                })
                this.disabled = true                  //禁用button
                this.codeMsg = `重新发送 ${this.codeNumbe}`
                let intVal = setInterval(() => {
                    --this.codeNumbe
                    this.codeMsg = `重新发送 ${this.codeNumbe}`
                }, 1000)
                setTimeout(() => {
                    clearInterval(intVal)
                    this.codeMsg = `获取短信验证码`
                    this.disabled = false  //解除禁用
                    this.codeNumbe = this.time
                }, this.time * 1000)
            }
        },
        goNext(){
            let tel =  this.userTel == this.axiosCode.userTel
            let code = this.axiosCode.codeNumber == this.code
            if(!tel){
                Toast({
                    message:"请输入正确的手机号"
                })
                return;
            }
            if(!code){
                Toast({
                    message:"验证码错误"
                })
                return;
            }
            this.$router.push({
                name:"Recovery_view",
                params:{
                    isCode:true,
                    userPhone:this.userTel
                }
            })
        },
    },
}
</script>

<style scpoed>
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
        box-sizing:border-box
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
    .input_div div{position: relative;}
    .flex_tu{position:absolute;right: 0;top: 0;height: 100%;width: 7.5rem;padding: .1875rem;}
    .duanxin{position: relative;}
    .duanxin button {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
        background: #B0352F;
        border: 1px solid #B0352F;
        color: #fff;
        width:8.125rem;
        height:2.75rem;
        border-radius: .1875rem;
        font-size: 1rem;
    }
</style>
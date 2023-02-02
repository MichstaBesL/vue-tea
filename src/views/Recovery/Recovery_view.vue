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
          <input type="text" placeholder="请输入密码" v-model="userPwd" maxlength="11">
          <div>
            <input type="text" v-model="userPwd2" placeholder="再一次确认密码">
          </div>
        </div>
        <button class="sublimt" @click="onRecovery">登 录</button>
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
      isCode: false, //是否输入过验证码
      userPhone:'',
      userPwd:'',
      userPwd2:'',
    }
  },
  created() {
    this.isCode = this.$route.params.isCode
    this.userPhone = this.$route.params.userPhone
    console.log(this.isCode,this.userPhone)
    if (!this.isCode) {
      this.$router.push("/recovery")
    }
  },
  methods: {
    goBack() {           //返回上一页
      this.$router.back()
    },
    goHome() {           //返回首页
      this.$router.push({ path: "/" })
    },
    queryPwd(pwd) {
      return pwd.length >= 6 ? true : false
    },
    onRecovery(){
      let userPwd = this.queryPwd(this.userPwd.trim())
      let userPwd2 = this.queryPwd(this.userPwd2.trim())
      if(!userPwd || !userPwd2){
        Toast({
          message:"密码长度最少6位"
        })
        return;
      }
      if(this.userPwd.trim() == this.userPwd2.trim()){
        http.$axios({
          url:"/api/userUpData",
          method:"POST",
          data:{
            userPhone:this.userPhone,
            userPwd:this.userPwd2
          }
        }).then((res)=>{
          Toast({
            message: res.msg
          })
          if(res.success){
            this.$router.push("/about")
          }
        })
      }else{
        Toast({
          message:"密码不一致，请重新输入"
        })
        return;
      }
    }
  }
}
</script>

<style scoped>
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
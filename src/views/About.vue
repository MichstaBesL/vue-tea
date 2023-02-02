<template>
  <div class="about action">
   <header>
      <div class="header">
        <div v-if="LoginStatus" class="tx_div">
          <img class="tx" :src="userInfo.iconImg" alt="">
          <span class="userName">{{ userInfo.nickName }}</span>
        </div>
        <div v-else class="login" @click="goLogin">
          登录/注册
        </div>
      </div>
   </header>
   <section>
    <ul class="list">
      <li @click="$router.push('/address')">地址管理</li>
      <li v-if="LoginStatus" @click="LOGIN_OUT">退出登录</li>
    </ul>
   </section>
   <Tabbar></Tabbar>
  </div>
</template>
<script scoped>
import Tabbar from "@/components/common/Tabbar.vue"
import { mapState,mapMutations } from "vuex"
  export default {
    name: 'About',
    components:{
      Tabbar
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo,
        LoginStatus:state => state.user.LoginStatus,
      }),
    },
    methods:{
      ...mapMutations(['LOGIN_OUT']),
      goLogin(){
        this.$router.push({
          path:'/login'
        })
      }
    }
  }
</script>
<style scoped>
  .header {
    background: #B64F4A;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 11.25rem;
  }
  .login{
    font-size: 1rem;
    padding:.5rem 1.125rem;
    background: #F8AB07;
    color:#fff;
    border-radius: .3125rem;
  }
  section{
    padding: 10px;
  }
  .tx_div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tx{
    width:3.75rem;
    border-radius: 1.875rem;
    }
  .userName{
    margin-top:.625rem;
    font-size: 1rem;
  }
  .list li{margin:.625rem 0}
</style>

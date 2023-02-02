<template>
    <header class="header">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <slot><span>地址管理</span></slot>
        <i class="sublimt iconfont icon-home" @click="goHome"></i>
    </header>
</template>

<script>
export default {
    methods:{
        goBack() {
            this.$router.back()
        },
        goHome() {
            this.$router.push("/")
        },
    }
}
</script>

<style scpoed>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .625rem;
  background: #B0352F;
  height: 2.75rem;
  color: #fff;
}
.top{display:flex;}
.top span{margin-left:10px}
.header i {
  font-size: 1.375rem;
}
</style>
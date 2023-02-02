<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default{
    created(){
      this.$store.commit("USER_INIT")
    }
  }
</script>

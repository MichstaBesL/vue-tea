<template>
    <div>
        <Header></Header>
        <!--  -->
        <section>
            <router-view></router-view>
        </section>
        <!--  -->
        <Tabbar></Tabbar>
    </div>
</template>
<script>
import Header from "@/components/Search/Header.vue"
import Tabbar from "@/components/common/Tabbar.vue"
export default{
    name:'search',
    components:{
        Header,
        Tabbar
    }
}
</script>
<style scoped>
section{width: 100vw;height: 100vh;}
</style>
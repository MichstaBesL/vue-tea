<template>
    <!-- <div class="top"> -->
        <div class="headers">
            <header class="header">
                <img id="logo" src="@/assets/img/logo.png" alt="">
                <div class="ss">
                    <input type="text" placeholder="搜您喜欢的..." @click="goSearch">
                </div>
                <div class="kf">
                    <img src="@/assets/img/kf.png" alt="">
                </div>
            </header>
        </div>
    <!-- </div> -->
</template>
<style scoped>
    .headers{
        width: 100%;
    }
    .ly-tabs{border: 0;}
    .header{
        background: #B0352F;
        display: flex;
        height: 50px;
    }
    #logo{width: 20%;}
    .ss{width: 70%;display: flex;justify-content: center;align-items: center;position: relative;}
    .ss input{width: 100%;border: 0;border-radius: 15px;height: 30px;text-indent: 2em;}
    .ss::before{
        content: "";
        width: 20px;
        height: 100%;
        background: url(@/assets/img/ss.png) no-repeat;
        background-size: 100% auto;
        background-position: 3px 15px;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .kf{width: 10%;display: flex;justify-content: center;align-items: center;}
    .kf img{width:30px;}
</style>
<script scoped>
    export default{
        name:"Header",
        methods:{
            goSearch(){
                this.$router.push("/search")
            }
        }
    }
</script>
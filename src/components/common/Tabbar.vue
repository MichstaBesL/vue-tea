<template>
    <div class="tabbar">
        <ul>
            <li
                v-for='(item,index) in list_item'
                :key="index"
                @click="switchSrc(item.path)"
            >
                <div>
                    <img :src="$route.path == item.path?item.selected:item.active_img" alt="">
                    <span
                        :class="$route.path == item.path?'active_p':''"
                    >{{item.name}}</span>
                </div>
            </li>
        </ul>   
    </div>
</template>
<style>
.active_p {
    color: #b0352f
}

.tabbar {
    /* position: fixed;
    left: 0;
    bottom: 0; */
    height: 6.33vh;
    width: 100%;
    background: #fff;
    padding-top: 5px;
}

.tabbar ul {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.tabbar ul li div {
    display: flex;
    justify-content: left;
    flex-flow: column;
    line-height: 30px;
    align-items: center;
    font-size: 12px;
    color: #666666;
}

.tabbar ul li img {
    width: 25px;
}
</style>
<script scoped>
    export default{
        name:"Tabbar",
        data:function(){
            return {
                list_item:[
                    {
                        name:"首页",
                        path:"/home",
                        active_img:require("../../assets/img/home.png"),
                        selected:require("../../assets/img/home-v.png")
                    },
                    {
                        name:"列表",
                        path:"/list",
                        active_img:require("../../assets/img/list.png"),
                        selected:require("../../assets/img/list-v.png")
                    },
                    {
                        name:"购物车",
                        path:"/cart",
                        active_img:require("../../assets/img/cart.png"),
                        selected:require("../../assets/img/cart-v.png")
                    },
                    {
                        name:"我的",
                        path:"/about",
                        active_img:require("../../assets/img/about.png"),
                        selected:require("../../assets/img/about-v.png")
                    },
                ]
            }
        },
        methods:{
            switchSrc(path){
                if(this.$route.path == path){
                    return;
                }
                this.$router.replace(path)
            }
        }
    }
</script>
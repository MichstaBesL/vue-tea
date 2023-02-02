<template>
    <div>
        <div class="hot">
            <h3>
                <div><i class="iconfont icon-huo"></i>历史搜索 </div>
                <div @click="deleteStroage">清空历史记录</div>
            </h3>
            <div class="hot_tag">
                <ul>
                    <li 
                        v-for="(item, index) in lsjl" 
                        :key="index"
                        @click="goSearchList(item)"
                    >
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="search_list">
            <div class="tj_hp">
                <h3><i class="iconfont icon-tuijian"></i>推荐商品</h3>
            </div>
            <div class="hp_list">
                <div class="item">
                    <div class="cent">
                        <div class="img">
                            <img src="@/assets/img/search/hp1.png" alt="">
                            <p class="ms">外形讨喜 甘甜可口</p>
                        </div>
                        <p class="title">云南凤庆经典蜜午滇红</p>
                        <div class="price">
                            <div>88<span>元</span></div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="cent">
                        <div class="img">
                            <img src="@/assets/img/search/hp1.png" alt="">
                            <p class="ms">外形讨喜 甘甜可口</p>
                        </div>
                        <p class="title">云南凤庆经典蜜午滇红</p>
                        <div class="price">
                            <div>88<span>元</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
    name:'searchIndex',
    data(){
        return {
            lsjl:[]
        }
    },
    created(){
        if(!localStorage.getItem("lsjl")){
            localStorage.setItem("lsjl",'')
        }else{
            this.lsjl = JSON.parse(localStorage.getItem("lsjl"))
        }
    },
    methods:{
        deleteStroage(){  //删除历史记录
            MessageBox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            }).then(res=>{
                console.log(res)
                if(res == 'confirm'){
                    window.localStorage.removeItem("lsjl")
                    this.$data.lsjl = []
                }
            })
        },
        goSearchList(item){
            this.$router.push({
                name:"Search_List",
                query:{
                    key:item
                }
            })
        }
    }
}
</script>
<style scoped>
    .hot h3{display: flex;justify-content: space-between;}
    .hot h3 div:last-child{font-size: 14px;color: #999;}
    .search_list{background: #F5F5F5;width: 100vw;height: 100vh;}
    .hot,.tj_hp{padding: 15px;}
    .hot h3,.tj_hp h3{font-weight: 500;margin-bottom: 15px;}
    .hot h3 i,.tj_hp h3 i{color: #B0352F;margin-right: 5px;}
    .hot_tag ul li{border: 1px solid #ddd;color: #999;margin-right: 20px;padding: 5px;margin-bottom: 15px;}
    .hot_tag ul{display: flex;flex-flow: wrap;}
    .tj_hp h3 i{font-weight: 600;}
    .hp_list{display: flex;flex-flow: wrap;}
    .hp_list .item{width: 50%;}
    .hp_list .item .cent{background: #fff;margin: 2px;}
    .hp_list .item img{width: 100%;}
    .hp_list .img{position: relative;padding: 10px;}
    .img .ms {
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        width: 100%;
        color: #fff;
        font-size: 12px;
        line-height: 25px;
        text-indent: 10px;
        width: 100%;
    }
    .title{ text-indent: 10px;width: 100%;line-height: 35px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .price{padding: 10px;font-size: 18px;color: #ff6600;}
    .price span{font-size: 14px;}
</style>
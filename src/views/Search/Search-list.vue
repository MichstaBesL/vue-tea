<template>
    <div class="cent">
        <div class="screen">
            <div 
                v-for="(item,index) in screenList.data"
                :key="index"
                @click="goScreenList(index)"
                class="xiaol">
                <span :class="screenList.screenIndex == index?'select':''">{{item.name}}</span>
                <div class="div_cent" v-if=" 'start' in item">
                    <i class="up iconfont icon-arrow-up" :class="item.start==1?'select':''"></i>
                    <i class="under iconfont icon-xiajiantoucu" :class="item.start==2?'select':''"></i>
                </div>
            </div>
        </div>
        <div class="list" v-if="searchList.length">
            <div class="item" v-for="(item, index) in searchList" :key="index">
                <div class="cent">
                    <img v-lazy="item.imgUrl" alt="">
                    <div class="title">{{ item.name }}</div>
                    <div class="price">
                        <div><span>￥</span>{{ item.price }}</div>
                        <div class="gm">立即购买</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noContent" v-show="!searchList.length">没有找到搜索内容。。。</div>
    </div>
</template>
<script>
import http from "@/common/api/request.js"
export default{
    name:'search_list',
    data(){
        return {
            screenList:{
                screenIndex:0,
                data:[
                    //start=>状态  start:0都不亮 1上箭头亮 2下箭头亮
                    { name: "综合" ,key:"zh"},
                    { name: "销量", start: 0 ,key:"num"},
                    { name: "价格", start: 0 ,key:"price"}
                ]
            },
            searchList:[]
        }
    },
    created(){
        this.getData()
    },
    watch:{
        $route(){
            this.getData()  
        }
    },
    computed:{
        orderBy(){
            //计算出当前点击的是哪个，并返回状态和key
            let item = this.screenList.data[this.screenList.screenIndex]
            //start 1为上(asc) 2为下(desc)
            return {
                [item.key]:item.start == 1 ? "asc":"desc"
                //返回key:asc||desc
            }
        }
    },
    methods:{
        async getData(){
            let res = await http.$axios({
                url:'/api/goods/shopList',
                params:{
                    key:this.$route.query.key,  //向后端传送搜索关键词
                    ...this.orderBy
                }
            })
            this.searchList = res
        },
        goScreenList(index){
            //index 为当前点击的下标 对应screenList.data 里的对象下标
            this.screenList.screenIndex = index
            //当前点击的对象
            let item = this.screenList.data[index]
            //初始化所有对象，并设置start为0 除当前和综合外的
            this.screenList.data.forEach((v,i)=>{
                if(index != i && i!=0){
                    v.start = 0
                }
            })
            if('start' in item) item.start != 1 ? item.start=1 : item.start=2;
            //发送请求，获取筛选后的数据
            this.getData()
        }
    }
}
</script>
<style scoped>
    .list{display: flex;flex-flow: wrap;background: #F3F3F3;}
    .list .item{width: 50%;}
    .item img{width: 100%;}
    .cent{padding: 10px;background: #fff;margin: 2px;}
    .title{overflow: hidden;text-overflow:ellipsis;white-space:nowrap;line-height: 30px;}
    .price{color: #B0352F;display: flex;justify-content: space-between;align-items: center;}
    .gm{color: #fff;background: #B0352F;border-radius: 5px;font-size: 14px;padding: 5px 10px;}
    .noContent{text-align: center;}
    .div_cent{display: flex;flex-direction: column;margin-left: 5px;}
    .xiaol{display: flex;align-items: center;}
    .screen{display: flex;align-items: center;justify-content: space-evenly;margin-bottom: 10px;}
    .select{color: #B0352F;font-weight: bold;}
</style>
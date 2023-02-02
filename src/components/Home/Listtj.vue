<template>
    <div class="listtj">
        <Card></Card>
        <div class="item_list">
            <div class="item" v-for="(item, index) in listtjList" :key="index">
                <div class="centent">
                    <div class="img_d">
                        <img v-lazy="item.imgUrl">
                    </div>
                    <div class="cent_d">
                        <div class="sdf">
                            <h3 class="title_d">{{ item.name }}</h3>
                            <div class="centent_d">{{ item.content }}</div>
                            <div class="price">
                                <span>￥</span>{{ item.price }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from "@/components/Home/Card.vue"
export default{
    name:'listtj',
    props:{
        listtjList:Array,
    },
    components:{
        Card,
    }
    }
</script>
<style scoped>
    
    .img_d{width: 50%;text-align: center;}
    .img_d img{height: 9.625rem;}
    .cent_d{width: 50%;text-align: right;display: flex;justify-content: center;flex-direction: column;}
    .sdf{width: 100%;}
    .item{background: #EEEEEE;margin: 10px 10px 0 10px;border-radius: 5px;}
    .item_list .item{height: 150px;padding: 10px 25px;}
    .centent{display: flex;height: 100%;}
    .item_list .item .centent img{width: 150px;}
    .title_d{font-weight: 400;color: #666666;font-size: 14px;}
    .centent_d{overflow: hidden;text-overflow: ellipsis;color: #333333;font-size: 17px;}
    .price{color:#b0352f;font-size: 22px;margin-top: 10%;}
    .price span{font-size: 14px;margin-right: 2px;}
    .listtj{background: #fff;}
</style>
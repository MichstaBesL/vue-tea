<template>
    <div class="guess">
        <Card>猜你喜欢</Card>
        <div class="content">
            <div class="guessList">
                <div class="item"
                    v-for="(item,index) in guessList"
                    :key="index"
                    @click="goDetails(item.id)"
                >
                    <div class="centItem">
                        <div class="imgDiv">
                            <img v-lazy="item.imgUrl" alt="">
                            <div v-if="item.shouqing" class="shouqing">售罄</div>
                        </div>
                        <div>
                            <div class="name">{{item.name}}</div>
                            <div class="price">￥<b>{{item.price}}</b></div>
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
    name:'guess',
    components:{
        Card,
    },
    props:{
        guessList:Array,
    },
    methods:{
        goDetails(id){
            this.$router.push({
                path:"/details",
                query:{
                    id:id
                }
            })
        }
    }
}
</script>
<style scoped>
.guessList {
    display: flex;
    flex-flow: wrap;
}

.guessList .item {
    width: 50%;
    /* height: 260px; */
}

.centItem {
    padding: 5px;
    text-align: center;
}

.centItem img {
    width: 100%;
}

.name {
    padding: 8px 0;
    font-size: 1rem;
    height: 1.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price {
    color: #b0352f;
}

.price b {
    font-size: 1.125rem;
}

.imgDiv {
    background: #F3F3F3;
    position: relative;
}
.imgDiv img{height: 12.75rem;}
.shouqing {
    position: absolute;
    width: 82px;
    height: 82px;
    display: block;
    left: 50%;
    margin-left: -41px;
    top: 50%;
    margin-top: -41px;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    line-height: 82px;
    border-radius: 50%;
    font-size: 18px;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
}
</style>
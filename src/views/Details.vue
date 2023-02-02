<template>
  <div class="details">
    <header class="header_bar ">
        <div class="beader_bar1" v-if="barIsShow">
          <i class="iconfont icon-fanhui" @click="goBack"></i>
          <i class="iconfont icon-shouye" @click="goHome"></i>
        </div>
        <div class="beader_bar2" v-if="!barIsShow" :style="barStyle">
          <i class="iconfont icon-fanhui" @click="goBack"></i>
          <span>商品详情</span>
          <span>商品评价</span>
          <i class="iconfont icon-shouye"  @click="goHome"></i>
        </div>
    </header>
    <section>
      <div class="btscrool" ref="wrappers">
        <div>
          <div class="swipers">
            <swiper class="mySwiper" :options="swiperoption">
              <swiper-slide v-for="(item, index) in swiperList" :key="index" class="swiper_item">
                <img v-lazy="item.imgUrl" alt="">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="title_div">
            <div class="title_top">
              <h3>{{goodsData.name}}</h3>
              <p class="ms">花香更显，色更油亮，香甜饱满，属于浓香型优品口粮茶。</p>
            </div>
            <div class="price">
              <div>
                <p>￥<span>{{goodsData.price}}</span></p>
              </div>
              <div>
                价格: <span class="del_font">{{goodsData.price}}</span>
              </div>
            </div>
          </div>
          <div class="center">
            <h3>商品详情</h3>
            <div class="contont">
              <div v-for="(item, index) in swiperList" :key="index" class="swiper_item">
                <img v-lazy="item.imgUrl" alt="" style="height:300px">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="footer">
      <span class="addCar" @click="addCar">加入购物车</span>
      <span class="gm">立即购买</span>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BetterScroll from 'better-scroll'
import http from "@/common/api/request.js"
import {Toast} from "mint-ui"
export default {
  name:'details_vue',
  components: {
      swiper,
      swiperSlide,
  },
  data() {
    return {
      barIsShow:true,  //顶部bar是否显示
      btScroll:'',     //scroll 对象
      barStyle:{},        //顶部bar过渡属性
      goodsData:{},    //商品数据
      id:0,
      swiperList:[
        {imgUrl:'/images/goods1.jpg'},
        {imgUrl:'/images/goods1.jpg'},
        {imgUrl:'/images/goods1.jpg'}
      ],
      swiperoption: {
        autoplay: true,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',    //与slot="pagination"处 class 一致
          type:"fraction"
        },
      }
    }
  },
  activated(){
    if (this.id != this.$route.query.id) {
      this.getDate()  //发送请求获取指定id的商品详情
    }
  },
  created(){
    this.getDate()  //发送请求获取指定id的商品详情

    this.$nextTick(()=>{
      this.btScroll = new BetterScroll(this.$refs.wrappers, {
        movable: true,
        zoom: true,
        mouseWheel: true,
        disableMouse: false,
        click: true,
        probeType: 3,
        bounce:false,
      })
      this.btScroll.on("scroll", (pos) => {
        if(Math.abs(pos.y)>50){
          this.barIsShow = false
        }else{
          this.barIsShow = true
        }
        let opacity = Math.abs(pos.y/298)
        this.barStyle = {
          opacity : opacity > 1 ? 1 : opacity
        }
      })
    })
  },
  methods:{
    goBack(){
      this.$router.back();
    },
    goHome(){
      this.$router.replace({path:'/'})
    },
    async getDate(){
      let res = await http.$axios({
        url: '/api/goods/details',
        params: {
          id: this.$route.query.id
        }
      })
      this.goodsData = res
      this.id=this.$route.query.id
    },
    addCar(){
      let goodsId = this.$route.query.id
      http.$axios({
        url: '/api/addCar',
        method:"POST",
        data: {
          goodsId:goodsId
        },
        headers:{ 
          token:true
        }
      }).then((res)=>{
        if(res.success){
          Toast({
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .beader_bar1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }
  .beader_bar1 i {
    font-size: 1.25rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1.5rem;
    width: 2.125rem;
    height: 2.125rem;
    text-align: center;
    line-height: 2.125rem;
  }
  .beader_bar2{background: #fff;}
  section{padding: 0 .625rem;height: 100%;overflow: hidden;}
  .details{display: flex;flex-direction: column;overflow: hidden;height: 100%;}
  .btscrool{height: 100vh;width:100vw;overflow: hidden;height: 100%;}
  .mySwiper{height: 100%;}
  .swiper_item img{width:100%;height: 13.25rem;}
  .swiper-pagination {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 15px;
    z-index: 10;
    color: #fff;
    background: rgba(0, 0, 0, .4);
    width: 1.5625rem;
    right: -90%;
    bottom: 20px;
    padding: 0 5px;
  }
  .del_font{
    text-decoration:line-through;
  }
  .title_top,.price{border-bottom: 1px solid #e3e5e9;padding: .625rem 0;}
  .title_div h3{font-size: 1.125rem;font-weight: 400;line-height: 2.1875rem;}
  .title_div .ms{font-size: .875rem;color: #999;line-height: 1.875rem;}
  .price div:first-child{font-size: .875rem;color: #D22531;}
  .price div:first-child span{font-size: 1.625rem;}
  .price div:last-child{color:#999}
  .center{padding: .625rem 0;}
  .center h3{border-left:.25rem solid red;font-size: .875rem;text-indent: .625rem;}
  .contont{margin:10px 0}
  .beader_bar2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.75rem;
    padding: .3125rem;
    font-size: 1rem;
  }
  .beader_bar2 i{font-size: 1.25rem;}
  header{  
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
  }
  .footer{display: flex;justify-content: space-around;height: 3.0625rem;line-height: 3.0625rem;}
  .footer span{display: inline-block;width: 100%;text-align: center;}
  .addCar{background: #FF9500;color:#fff;}
  .gm{background: #DD2727;color:#fff;}
</style>
<style>
.swiper-pagination span{background: none;}
</style>
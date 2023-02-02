<template>
    <div class="swipers">
        <swiper class="mySwiper" :options="swiperoption">
            <swiper-slide
                v-for="(item,index) in swiperList"
                :key="index"
            >
                <img v-lazy="item.imgUrl" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<style >
.swiper-pagination{display: flex;justify-content: center;position: relative;bottom: 15px;z-index: 10;}
.swiper-pagination span{width: 8px;height: 8px;background: #efe2e1;display:inline-block;border-radius: 10px;margin-right:5px;}
.swiper-pagination .swiper-pagination-bullet-active{background: #B0352F;}
.swipers{overflow: hidden;height: 212px;}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
// Import Swiper styles
import "swiper/css";
export default{
    name:"swipers",
    components: {
        swiper,
        swiperSlide,
    },
    props:{
        swiperList:Array,
    },
    data(){
        return{
            swiperoption:{
                autoplay:true,
                speed:1000,
                loop:true,
                pagination: {
                    el: '.swiper-pagination',    //与slot="pagination"处 class 一致
                },
            }
        }
    }
}
</script>
  
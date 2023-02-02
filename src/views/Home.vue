<template>
  <div class="home">
    <!--头部 -->
    <div class="top">
      <Header></Header>
      <ly-tabs v-model="value" activeColor="#B0352F" :lineWidth="line_w" @change="changeTab">
        <ly-tab-item class="ly_item" v-for="(item, index) in lytabList" :key="index" :name="item.id" :title="item.name" />
      </ly-tabs>
    </div>

    <section ref="wrappers">
      <div>
        <div v-for="(item,index) in newData" :key="index">
          <Swiper ref="sw" v-if="item.type=='swiperList'" :swiperList="item.data"></Swiper>
          <Icons v-if="item.type=='iconsList'" :iconsList="item.data"></Icons>
          <Listtj v-if="item.type=='listtjList'" :listtjList="item.data"></Listtj>
          
          <Ad v-if="item.type=='adList'" :adList="item.data"></Ad>
          
          <Guess v-if="item.type=='guessList'" :guessList="item.data"></Guess>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script scoped>
import Header from "@/components/Home/Header.vue"
import Swiper from "@/components/Home/Swiper.vue"
import Icons from "@/components/Home/Icons.vue"
import Listtj from "@/components/Home/Listtj.vue"
import Ad from "@/components/Home/Ad.vue"
import Guess from "@/components/Home/Guess.vue"
import Tabbar from "@/components/common/Tabbar.vue"

import http from "@/common/api/request.js"
//引入滚动插件
import BetterScroll from 'better-scroll'

export default {
  name: 'Home',
  data() {
    return {
      value: 0,   //ly-tab 默认选中项
      line_w: 40, //ly-tab 下划线宽
      newData:[],
      lytabList:[]
    }
  },
  components: {
    Header,
    Swiper,
    Icons,
    Listtj,
    Ad,
    Guess,
    Tabbar,
  },
  created(){
    this.getData(0)
  },
  methods: {
    newScroll(){
      new BetterScroll(this.$refs.wrappers, {
        movable: true,
        zoom: true,
        mouseWheel: true,
        disableMouse: false,
        click:true,
        probeType:3,
      })
    },
    async getData(){
      let res = await http.$axios({url:"/api/index_list/0/data/1"}) //获取首页第一屏数据
      this.lytabList = Object.freeze(res.lytabList)
      this.newData = Object.freeze(res.data)
      this.$nextTick(() => {
        this.newScroll()                                        //获取到后设置滚动组件
      })
    },
    async addData(index1,index2=1){
      let res = await http.$axios({url:'/api/index_list/'+index1+'/data/'+index2})
      if(res.constructor != Array){            //判断是否为数组，数组只有两层结构，对象三层
        this.newData = Object.freeze(res.data)
      }else{
        this.newData = Object.freeze(res)
      }
    },
    changeTab(index) {       //tab 切换
      this.addData(index)
    },
  }
}
</script>
<style scoped>
.ly-tabs .ly-tab-item {
  font-size: 1.05rem;
}

.top {
  height: 92px;
}

section {
  flex: 1;
  overflow: hidden;
}

.sb p {
  line-height: 40px;
}

.home {
  width: 100Vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

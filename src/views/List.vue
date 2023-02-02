<template>
    <div class="max">
        <header>
          <div class="search_header">
            <div class="fh" @click="goBack"><i class="iconfont icon-fanhui "></i></div>
            <div class="search_input">
                <i class="iconfont icon-sousuo ss"></i>
                <form action="" onsubmit="return false" @click="goSearch">
                    <input type="text" v-model="input_value" placeholder="搜索您喜欢的...">
                </form>
            </div>
            <div class="sublimt iconfont icon-home" @click="goHome"></div>
        </div>
        </header>
        <section>
          <div class="leftDiv">
            <ul class="left_fn">
              <li
                v-for="(item1,index1) in title_1"
                :key="index1"
                :class="{active:index1==getScrollIndex}"
                @click="left_setActive(index1)"
              ><span>{{item1}}</span></li>
            </ul>
          </div>
          <div class="rightDiv" ref="wrappers">
            <div ref="transform">
              <div class="center" v-for="(item,index) in content" :key="index">
                <div class="img" v-if="(index==0)">
                  <img v-lazy="imgUrl" alt="" style="height:148px">
                </div>
                <div class="item" v-for="(item2,index2) in item" :key="index2">
                  <h3><i></i>{{item2.name}}<i></i></h3>
                  <ul>
                    <li v-for="(v,i) in item2.list" :key="i">
                      <img v-lazy="v.imgUrl" alt="">
                      <span>{{v.name}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="center" style="height:700px"></div>
            </div>
            
          </div>
        </section>
        <Tabbar class="tab"></Tabbar>
    </div>
</template>
<script scoped>
import Tabbar from "../components/common/Tabbar.vue"
import http from "@/common/api/request.js"
//引入滚动插件
import BetterScroll from 'better-scroll'

  export default {
    name: 'List',
    components:{
      Tabbar
    },
    data(){
      return {
        input_value:this.$route.query.key||'',
        title_1:[],             //一级标题
        content:[],             //内容
        all_center_height:[],   //右内容，储存每一项内容的高
        imgUrl:'/images/swiper2.jpeg',
        btScroll:'',            //滚动插件
        scrolly:''              //右侧滑动距离
      }
    },
    computed:{
      getScrollIndex(){
        return this.all_center_height.findIndex((item,index)=>{
          return this.scrolly >= item && this.scrolly < this.all_center_height[index+1]
        })
      }
    },
    async created(){
      let arr = []
      let res = await http.$axios({
        url:'/api/List'
      })
      res.forEach((v) => {
        this.title_1.push(v.name)
        arr.push(v.data)
      });
      this.content = arr

      
      this.$nextTick(() => {
        this.btScroll = new BetterScroll(this.$refs.wrappers, {
          movable: true,
          zoom: true,
          mouseWheel: true,
          disableMouse: false,
          click: true,
          probeType: 3,
        })
        this.btScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(pos.y)
        })
      })

      this.$nextTick(()=>{
        let all_center = Array.from(this.$refs.wrappers.getElementsByClassName("center"))
        let height = 0
        all_center.forEach(v => {
          this.all_center_height.push(height)
          height += v.clientHeight
        })
      })
      
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      goSearch(){
        this.$router.push('/search')
      },
      goHome(){
        this.$router.push("/")
      },
      left_setActive(index){
        // this.active_center = index  //切换选中项   
        this.btScroll.scrollTo(0,-this.all_center_height[index],300) //x y  过渡时间
      }
    }
  }
</script>
<style scoped>
  .max{display: flex;flex-flow: wrap;flex-direction: column;height: 100%;overflow: hidden;}
  /* header{flex: 1;} */

  .item ul li {width: 33.33%;text-align: center;margin-bottom: 15px;display: flex;flex-flow: wrap;align-items: center;justify-content: center;}
  .item ul li img{width: 70%;height: 74px;}
  .item ul{display: flex;flex-flow: wrap;}
  .center h3 {
      text-align: center;
      font-size: 18px;
      position: relative;
      font-weight: 300;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
  }  
  .center h3 i{display: inline-block;width: 20px;border-bottom: 1px solid #d9d9d9;}
  .center h3 i:first-child{margin-right: 5px;}
  .center h3 i:last-child{margin-left: 5px;}
  .rightDiv{width: 75%;height: 100%;overflow: hidden;}
  .leftDiv{width: 25%;height: 100vh;}
  .left_fn{border-right: 1px solid #efefef;height: 100%;}
  .left_fn li{color: #222;line-height: 30px;}
  .left_fn li span {
    width: 100%;
    margin: 20px 0;
    align-items: center;
    display: flex;
    font-size: 16px;
    justify-content: center;
  } 
  .active span{color: #B0352F;border-left: 3px solid #B0352F;}
  section{width:100vw;display: flex;overflow: hidden;height: 90vh;}
  .img{padding: 10px;}
  .img img{width: 100%;}
  .search_header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #B0352F;
        color:#fff;
        width: 100%;
        height: 42px;
    }
    .fh i{font-size: 24px;padding-left: 15px;}
    .fh{display: flex;justify-content: center;align-items: center;}
    .search_input .ss{font-size: 18px;color: #999;margin-left: 10px;}
    .search_input{
        border-radius: 30px;
        width:320px;
        height: 30px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search_input input{width: 90%;}
    .search_input form{width: 100%;margin-left: 5px;}
    .sublimt{width: 40px;font-size: 28px;}
    .hot h3{display: flex;justify-content: space-between;}
    .hot h3 div:last-child{font-size: 14px;color: #999;}
    .search_list{background: #F5F5F5;width: 100vw;height: 100vh;}
    .hot,.tj_hp{padding: 15px;}
    .hot h3,.tj_hp h3{font-weight: 500;margin-bottom: 15px;}
    .hot h3 i,.tj_hp h3 i{color: #B0352F;margin-right: 5px;}
    .hot_tag ul li{border: 1px solid #ddd;color: #999;margin-right: 20px;padding: 5px;margin-bottom: 15px;}
    .hot_tag ul{display: flex;flex-flow: wrap;}
</style>
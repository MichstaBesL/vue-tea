<template>
    <div class="action">
      <header class="header">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <span>购物车</span>
        <span @click="switchBan" v-text="cartBan?'完成':'编辑'"></span>
      </header>
      <section v-if="list.length">
        <div class="top">
          <van-checkbox @click="checkedFn" :value="isCheked"></van-checkbox>
          <span>商品</span>
        </div>
        <div class="list">
          <ul>
            <li class="item" 
              v-for="(item,index) in list"
              :key="index"
            >
              <div>
                <van-checkbox @click="CART_SINGLE(item.id)" v-model="item.checked"></van-checkbox>
              </div>
              <div>
                <div><img class="img" :src="item.goods_img" alt=""></div>
                <div class="centeres">
                  <p class="title">{{ item.goods_name }}</p>
                  <span class="price red">￥{{ item.goods_price }}</span>
                </div>
                <div class="abs">
                  <i class="delete iconfont icon-icon-test" @click="deleteCart(item.id)"></i>
                  <div>
                    <van-stepper v-model="item.goods_num" @change="changeNum($event,item)" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section v-else>
        <div class="ts">
          没有数据，<router-link to="/">去首页添加</router-link>
        </div>
      </section>
      <footer v-if="list.length">
        <div class="left_div">
          <div class="radio">
            <van-checkbox @click="checkedFn" :value="isCheked"></van-checkbox>
          </div>
          <div v-if="!cartBan">
            <p>共有<span class="red">{{ total.num }}</span>件商品</p>
            <div>
              总计<span class="red">￥{{ total.totalPrice }}</span> + <span class="red">0茶币</span>
            </div>
          </div>
        </div>
        <div class="sublimt" v-if="!cartBan"><span>去结算</span></div>
        <div class="sublimt" v-else @click="deleteCart"><span>删除</span></div>
      </footer>
    </div>
</template>
<script>
import http from "@/common/api/request.js"
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
  export default {
    name: 'Cart',
    data(){
      return {
        value:1,
        checked:true,
        cartBan:false,
      }
    },
    activated(){
      this.getData()
    },
    computed:{
      ...mapState({
        userId: state => state.user.userInfo.id,
        list: state => state.cart.list,
      }),
      ...mapGetters(['isCheked','total'])
    },
    methods:{
      ...mapMutations(["CART_LIST",'CART_SINGLE']),
      ...mapActions(["checkedFn","deleteCart"]),
      goBack() {
        this.$router.push('/')
      },
      getData(){
        http.$axios({
          url: '/api/showCart',
          method:"POST",
          data: {
            userId:this.userId
          }
        }).then((res)=>{
          if(res.success){
            res.goodsArr.forEach(v=>{
              v["checked"] = false
            })
            this.CART_LIST(res.goodsArr)
          }
        })
      },
      switchBan(){
        this.cartBan = !this.cartBan
      },
      changeNum(value,detail){
        http.$axios({
          url:"/api/cartUpDate",
          method:"POST",
          headers:{
            token:true,
          },
          data:{
            value:value,
            id:detail.id
          }
        }).then(res=>{
          console.log(res)
        })
      }
    }
  }
</script>
<style scoped>
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .625rem;
      background: #B0352F;
      height: 2.75rem;
      color: #fff;
    }
    .top{display:flex;}
    .top span{margin-left:10px}
    .header i {
      font-size: 1.375rem;
    }
    footer{
      display: flex;
      justify-content: space-between; 
      align-items: center;
    }
    .left_div{
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: .75rem;
    }
    .radio{
      width: 1.875rem;
    }
    .red{
      color: #B0352F;
      font-size: .875rem;
      padding: 0 .3125rem;
    }
    .sublimt{
      width: 7.5rem;
      color: #fff;
      background: #B0352F;
      align-items: center;
      height:100%;
      display: flex;
      font-size: 1rem;
      justify-content: center;
    }
    .top{border-bottom: 1px solid #ccc;padding: .625rem;line-height: 1.875rem;}
    .item{
      display:flex;
      justify-content: space-between;
      align-items: center;
      padding: .4375rem 0;
      border-bottom: 1px solid #e8e8e8;
    }
    .list{padding:.625rem;}
    .item>div:first-child{width:10%;}
    .item>div:last-child{width:90%;position: relative;display: flex;}
    .abs {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .img{width: 4.375rem;padding: 8px;border: 1px solid #e8e8e8;border-radius: 2px;}
    .centeres{padding-left: .625rem;width: 80%;}
    .title {
      width: 80%;
      box-sizing: border-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
      margin-bottom: 15px;
    }
    .price{margin-top: .9375rem;}
    .delete{font-size: 1.25rem;}
    .ts{font-size: 1rem;text-align: center;line-height: 1.875rem;}
</style>
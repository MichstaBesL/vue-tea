<template>
  <div class="action">
    <Header></Header>
    <section>
      <div class="cents">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from "@/components/address/header.vue"
import Tabber from "@/components/common/Tabbar.vue"
import http from "@/common/api/request"
export default {
  data() {
    return {
      chosenAddressId: '',
      list: [],
    };
  },
  created(){
      this.getData()
  },
  components:{
      Header,
      Tabber,
  },
  methods: {
    getData() {                 //获取地址列表
        http.$axios({
            url: "/api/showAddress",
            method: "POST",
            headers: {
                token: true
            }
        }).then(res => {
            this.list = res.data
            res.data.forEach(v=>{
                v.isDefault == 1? this.chosenAddressId = v.id:""
            })
        })
    },
    onAdd() {                  //添加地址
      this.$router.push({
          name:"AddAddress"
      })
    },
    onEdit(item, index) {      //地址修改
        this.$router.push({
            name:"EditAddAddress",
            params:{
                item,
                index,
            }
        })
    },
  },
}
</script>
<style>
.van-address-list__bottom {
  position: initial;
  margin-top:30px;
}
</style>
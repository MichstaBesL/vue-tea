<template>
  <div>
    <Header>添加地址</Header>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      @save="onSave"
    />
  </div>
</template>

<script>
import Header from "@/components/address/header.vue"
import {Toast} from "vant"
import http from "@/common/api/request"
export default {
  components:{
    Header,
  },
  data() {
    return {
      areaList:{
        province_list: {
          110000: '北京市',
          120000: '天津市',
        },
        city_list: {
          110100: '北京市',
          120100: '天津市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          // ....
        },
      },
    };
  },
  methods:{
    onSave(content) {
      console.log(content)
      http.$axios({
        url:"/api/addAddress",
        method:"POST",
        headers:{
          token:true
        },
        data:{
          content
        }
      }).then(res=>{
        if(res.success){
          Toast('保存成功');
          this.$router.back()
        }
      })
    },
  }
}
</script>

<style>

</style>
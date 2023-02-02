<template>
<div>
    <Header>修改地址</Header>
    <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        v-bind:area-placeholder="area"
        @save="onSave"
        @delete="onDelete"
    />
</div>
</template>

<script>
import Header from "@/components/address/header.vue"
import { Toast } from "vant"
//import http from "@/common/api/request"
export default {
    data() {
        return {
            areaList: {
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
            item:{}
        };
    },
    components: {
        Header,
    },
    computed:{
        area(){
            return this.item.province+"/"+this.item.city+"/"+this.item.area
        }
    },
    activated(){
        console.log("sb")
        this.item = this.$route.params.item || {}
    },
    created(){
        this.getItem()
    },
    methods: {
        getItem(){
            this.item = this.$route.params.item
        },
        onSave(content) {  //保存修改
            console.log(content)

        },
        onDelete() {      //删除
            Toast('delete');
        },
    }
}
</script>

<style>

</style>
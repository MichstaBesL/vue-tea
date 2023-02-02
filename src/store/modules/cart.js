import {
    CART_LIST,
    CART_SELECT_ALL,
    CART_CANCEL,
    CART_SINGLE,
} from "./mutaions-types"

import { Dialog,Toast  } from 'vant'
import http from "@/common/api/request"

export default{
    state:{
        list:[],
        list_select:[]
    },
    getters:{
        isCheked(state){
           return state.list.length == state.list_select.length
        },
        total(state){
            let totalObj = {
                num:0,
                totalPrice:0
            }
            state.list.forEach(v=>{
                if(v.checked){
                    totalObj.num += Number(v.goods_num)
                    totalObj.totalPrice += v.goods_price * v.goods_num
                }
            })
            return totalObj;
        }
    },
    mutations:{
        [CART_LIST]( state , carList){
            state.list_select=[]
            state.list =  carList

            //购物车默认全选则开启
            // carList.forEach(v=>{
            //     state.list_select.push(v.id)
            // })
        },
        //全选
        [CART_SELECT_ALL]( state ){
            state.list_select = state.list.map(v=>{
                v.checked = true;
                return v.id
            })
        },
        //全不选 
        [CART_CANCEL]( state ){
            state.list.forEach(v=>{
                v.checked = false;
            })
            state.list_select = []
        },
        //单选
        [CART_SINGLE]( state , id){

            let index = state.list_select.indexOf(id)
            if(index == "-1"){  //没有匹配到
                state.list_select.push(id)
                return;
            }
            state.list_select.splice(index,1)
        },
        DELETE_GOODS(state,idArr){
            //删除list中对应的商品
            state.list = state.list.filter((v)=>{
                return idArr.indexOf(v.id) == "-1"
            })
            state.list_select = state.list_select.filter((v)=>{
                return idArr.indexOf(v) == "-1"
            })
        }
    },
    actions:{
        checkedFn ( {commit , getters} ){
            getters.isCheked ? commit("CART_CANCEL") : commit("CART_SELECT_ALL");
        },
        deleteCart({commit,state},id){
            let cartArr = []
            if(typeof id == "number"){  //单个删除
                cartArr = [id]
            }else{                      //多个删除
                cartArr = state.list_select
            }
            Dialog.confirm({
                title: '删除',
                message: '确认删除此商品',
            }).then(() => {
                // on confirm
                http.$axios({
                    url:"/api/deleteCart",
                    method:"POST",
                    data:{
                        cartArr:cartArr,
                    }
                }).then((res)=>{
                    if(res.success){
                        commit("DELETE_GOODS",cartArr)
                        Toast.success('删除成功')
                    }
                })
            })
            
        }
    }
}
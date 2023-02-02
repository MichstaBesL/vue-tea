import axios from 'axios';
import { Indicator } from 'mint-ui';
import store from "@/store"
import router from "@/router"
export default{
    common:{
        method: "GET",
        data: [],
        parmas: '',
        headers:{},
    },
    $axios(options={}){
        options.method = options.method || this.common.method  //如果有传method就用传来的，否则用默认的
        options.data = options.data || this.common.data
        options.parmas = options.parmas || this.common.parmas
        options.headers = options.headers || this.common.headers

        //请求前 => 显示加载中
        Indicator.open('加载中...')

        if(options.headers.token){
            options.headers.token = store.state.user.token
            if(!options.headers.token){
                router.push("/login")
            }
        }

        return axios(options).then((v)=>{
            let dataValue = v.data.data
            return new Promise((res,rej)=>{
                if(!v) return rej();  //如果请求后没有数据直接返回
                //结束 => 关闭加载中
                setTimeout(()=>{
                    Indicator.close();
                },300)
                res(dataValue)
            }).catch((e) => {
               console.log(e)
            })
        })
    }
}
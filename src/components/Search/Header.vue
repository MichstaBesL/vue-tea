<template>
    <div class="top">
        <div class="search_header">
            <div class="fh" @click="goBack"><i class="iconfont icon-fanhui "></i></div>
            <div class="search_input">
                <i class="iconfont icon-sousuo ss"></i>
                <form action="" onsubmit="return false" @keyup.enter="goSearchList">
                    <input type="text" class="inputs" ref="inputValue" v-model="input_value" placeholder="搜索您喜欢的...">
                </form>
            </div>
            <div class="sublimt" @click="goSearchList">搜索</div>
        </div>
    </div>
</template>
<script>
// import { MessageBox } from 'mint-ui';
export default{
    name:'search_header',
    data(){
        return{
            input_value:this.$route.query.key||'',
            lsjl:[]     //历史记录 数据
        }
    },
    watch:{
        $route(){
            this.input_value=this.$route.query.key||''
        }
    },
    created(){
        if(!localStorage.getItem("lsjl")){
            localStorage.setItem("lsjl",'')
        }else{
            this.$data.lsjl = JSON.parse(localStorage.getItem("lsjl"))
        }
    },
    mounted(){
        this.$refs.inputValue.focus()  //自动光标聚焦
    },
    methods:{
        goSearchList(){
            //跳转搜索结果页
            let values = this.$data.input_value            //输入框内容
            if(!values) return                             //如果搜索关键词为空 直接return 
            this.lsjl.unshift(values)  
            this.lsjl = Array.from(new Set(this.lsjl))     //去重
            window.localStorage.setItem("lsjl",JSON.stringify(this.lsjl))
            //判断搜索关键词是否有变化，如果没有变化则不跳转
            if(this.$data.input_value == this.$route.query.key) return
            this.$router.push({
                name:"Search_List",
                query:{
                    key:this.$data.input_value
                }
            })
            
        },
        goBack(){
            this.$router.back()
        },
    }
}
</script>
<style scoped>
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
    .sublimt{width: 40px;}
    .hot h3{display: flex;justify-content: space-between;}
    .hot h3 div:last-child{font-size: 14px;color: #999;}
    .search_list{background: #F5F5F5;width: 100vw;height: 100vh;}
    .hot,.tj_hp{padding: 15px;}
    .hot h3,.tj_hp h3{font-weight: 500;margin-bottom: 15px;}
    .hot h3 i,.tj_hp h3 i{color: #B0352F;margin-right: 5px;}
    .hot_tag ul li{border: 1px solid #ddd;color: #999;margin-right: 20px;padding: 5px;margin-bottom: 15px;}
    .hot_tag ul{display: flex;flex-flow: wrap;}
    .inputs{color:#444;}
</style>
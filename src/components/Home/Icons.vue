<template>
    <div class="icons">
        <ul class="ico_list">
            <li
                v-for="(item,index) in iconsList"
                :key="index"
            > 
                <img v-lazy="item.imgUrl">
                <p>{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default{
    name:'icons',
    props:{
        iconsList:Array,
    }
}
</script>
<style scoped>
    .ico_list{display: flex;justify-content: space-around;}
    .ico_list li{text-align: center;}
    .ico_list li img{width: 2.5625rem;margin:3px 0;height: 2.5625rem;}
</style>

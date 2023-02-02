<template>
    <div class="ad">
        <div v-for="(item,index) in adList" :key="index">
            <img v-lazy="item.imgUrl" alt=""/>
        </div>
    </div>
</template>
<script>
export default{ 
    name:'ad',
    props:{
        adList:Array,
    }
}
</script>
<style scoped>
    .ad{width: 100%;}
    .ad img{width: 100%;height: 100%;}
</style>
<template>
    <div class="title">
        <span>
            <slot>爆款推荐</slot>
        </span>
    </div>
</template>
<script>
export default{
    
}
</script>
<style scoped>
    .title{font-size: 20px;text-align: center;line-height: 40px;margin: 10px 0;}
    .title span::after,.title span::before{
        content: "";height: 8px;width: 8px;background: #D4C0A7;display: inline-block;border-radius: 10px;
    }
    .title span::after{margin-left: 12px;}
    .title span::before{margin-right: 12px;}
</style>
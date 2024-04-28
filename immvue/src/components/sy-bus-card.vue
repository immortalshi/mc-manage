<template>
    <div class="card-container">
        <div class="card-img">
            <img :src="require('../assets/images' + busInfo.url)" alt="">
        </div>
        <view class="card-content">
            {{busInfo.content}}
        </view>
    </div>
</template>

<script>
    export default {
        name: "sy-bus-card",
        props: ['busInfo'],
    }
</script>

<style lang="scss" scoped>
    .card-container {
        width: 320px;
        height: 420px;
        border-radius: 15px;
        margin: 20px;
        float: left;
        box-shadow: 0px 1px 2px 1px rgb(0 0 0 / 11%);
        display: inline-block;


        &:hover {
            box-shadow: 0px 14px 25px -2px rgb(0 0 0 / 14%);
            transform: translateY(-2px);
            float: left;
            transition: 0.3s;
        }
    }
    .card-img {
        width: 320px;
        height: 180px;
        border-radius: 15px 15px 0 0;

        img {
            width: 320px;
            height: 180px;
            border-radius: 15px 15px 0 0;
        }
    }
</style>

<template>
    <div class="player-card" v-for="(item,i) in playerList" :key="i">
        <img :src="require('@/assets/images' + item.playerImg)" alt="">
        <div class="introduction">
            <div class="introduction-content">
                {{item.name}}
                <div class="player-content">{{item.introduce}}</div>
                <div class="player-content" style="color: #FF8C00;">PS：{{item.PS}}</div>
                <a :href="item.bilibiliUrl" class="link-btn">
                    直播热线
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sy-user-card",
        props: ['playerList'],
    }
</script>

<style lang="scss" scoped>
    .player-card {
        width: 250px;
        height: 400px;
        margin: 30px 50px;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        display: inline-block;
        align-self: center;
        justify-items: center;
        transition: all .5s;
    }

    .player-card:hover {
        transform: translateY(-20px);
        box-shadow: 5px 5px 25px 5px #BFBFBF;
        /*background-color: rgba(241, 233, 210, .6);*/
        /*background-color: #d51819;*/
        background-color: #17ddc8;
        overflow: hidden;
    }

    .player-card img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5s;
        z-index: 100;
        object-fit: cover;
    }

    .player-card:hover img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        /*border: 5px solid #F0E68C;*/
        border: 5px solid #FFF;
        z-index: 100;
    }

    .introduction {
        width: 100%;
        position: absolute;
        top: 100%;
        opacity: 0;
        overflow: hidden;
        transition: all .5s;
    }

    .player-card:hover .introduction {
        opacity: 1;
        width: 100%;
        height: calc(100% - 100px);
        position: absolute;
        top: 100px;
        left: 0px;
        /*border-top: 5px solid #F0E68C;*/
        border-top: 5px solid #FFF;
        background-color: #FFFFFF;

        /*&:before {
            content: '';
            display: inline-block;
            height: 80px;
            width: 80px;
            border-radius: 45%;
            background-color: #EA739A;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999
        }*/
    }

    .introduction-content {
        margin-top: 40px;
        height: calc(100% - 40px);
        overflow: hidden;
        font-size: 24px;
        font-weight: 700;
    }

    .player-content {
        padding: 0 20px;
        font-size: 12px;
        line-height: 24px;
        font-weight: 400;
    }

    .link-btn {
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        height: 40px;
        border-radius: 25px;
        border: 3px solid #17ddc8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #17ddc8 !important;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        text-decoration: none;

        &:hover {
            background-color: #17ddc8;
            color: #FFFFFF !important;
            transform: translateY(-5px) translateX(-50%);
            box-shadow: 0px 14px 10px -2px rgb(0 0 0 / 14%)
        }
    }
</style>

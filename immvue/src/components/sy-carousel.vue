<template>
    <div style="width: 100%; height: 100%; position: relative">
        <!--图片文字部分-->
        <div class="img-item" v-for="(item,i) in imgList" :key="i">
            <img :src="require('@/assets/images' + item.url)" style="width: 100vw; height: 100vh"
                 :class="this.imgIndex === i ? 'show-img' : 'hide-img'">
            <div class="item-content">
                <div :class="this.imgIndex === i ? 'show-carousel-content' : 'carousel-content'">
                    {{item.content}}
                    <div class="img-btn">{{item.btn}}</div>
                </div>

            </div>
        </div>

        <!--锚点部分-->
        <div class="point-container">
            <div v-for="(item,i) in imgList"
                 :key="i"
                 :class="this.imgIndex === i ? 'index-point' : 'point'"
                 style="cursor: pointer"
                 @mousemove="chooseIndex(i)"
                 @mouseleave="leaveIndex()">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sy-carousel",
        props: ["imgList"],
        data() {
          return {
              imgIndex: 0,
              isOver: false,
              // imgList: this.list,
          }
        },
        mounted() {
            setInterval(() => {
                if (!this.isOver) {
                    let temp = this.imgIndex
                    this.imgIndex = (temp + 1) % this.imgList.length
                }
            }, 8000)
        },
        methods: {
            //选择图片
            chooseIndex(i) {
                this.isOver = true
                this.imgIndex = i
            },

            //离开
            leaveIndex() {
                this.isOver = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-item {
        width: 100vw;
        height: 100vh;
        position: absolute;
        opacity: 1;
        overflow: hidden;
    }

    .show-img {
        opacity: 1;
        animation: showImg 1s ease-in forwards;
    }

    @keyframes showImg {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .hide-img {
        opacity: 0;
        animation: hideImg 1s ease-in forwards;
    }

    @keyframes hideImg {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    .item-content {
        width: 100%;
        height: 40%;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*background-color: #42b983;*/
    }

    .carousel-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -20%);
        font-size: 70px;
        font-weight: 700;
        text-align: center;
        opacity: 0;
        color: #27E1C1;
        /*transition: all 0.5s;*/
    }

    .show-carousel-content {
        position: absolute;
        font-size: 70px;
        font-weight: 700;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        opacity: 1;
        /*color: #FFFACD;*/
        color: #27E1C1;
        /*animation: showContent 2s ease-in-out forwards;*/
        transition: all 2s;
    }

    @keyframes showContent {

        0% {
            top: 100vh;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
        }

        50% {
            top: 75%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
        }

        100% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;
        }

    }

    .img-btn {
        height: 65px;
        padding: 0 20px;
        border-radius: 33px;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 3px 3px 4px #999999;
        background-color: #27E1C1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .point-container {
        position: absolute;
        top: 90vh;
        left: 50%;
        transform: translateX(-50%);
        padding: 0px 10px;
        width: 220px;
        height: 30px;
        border-radius: 16px;
        background-color: rgba(241, 233, 210, .3);
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .index-point {
        position: relative;
        margin: 0px 5px;
        width: 60px;
        height: 15px;
        border-radius: 8px;
        background-color: rgba(251, 251, 251, 1);
        animation: long 0.3s ease-in forwards;
    }

    @keyframes long {
        0% {
            width: 15px;
            background-color: rgba(251, 251, 251, .6);
        }

        100% {
            width: 60px;
            background-color: rgba(251, 251, 251, 1);
        }
    }

    .point {
        position: relative;
        margin: 0px 5px;
        width: 15px;
        height: 15px;
        border-radius: 8px;
        background-color: rgba(251, 251, 251, .6);
        animation: short 0.3s ease-in forwards;
    }

    @keyframes short {
        0% {
            width: 60px;
            background-color: rgba(251, 251, 251, 1);
        }

        100% {
            width: 15px;
            background-color: rgba(251, 251, 251, .6);
        }
    }
</style>

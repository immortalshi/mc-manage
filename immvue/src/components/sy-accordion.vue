<template>
    <div class="img-container">
        <div class="img-item" v-for="(item,i) in imgList" :key="i" @mousemove="chooseImg(i)">
            <div :class="imgIndex === i ? 'show-img' : 'hide-img'">
                <img :src="require('../assets/images' + item.url)" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sy-accordion",
        props: ['imgList'],
        data() {
            return  {
                imgIndex: 0,
                timer: null,
            }
        },
        mounted() {
            let list = document.getElementsByClassName('img-item')
            for(let i = 0; i < list.length; i++) {
                list[i].style.left = (i * 100) + "px"
            }
        },

        methods: {
            chooseImg(i) {
                this.imgIndex = i
                // if(this.timer) {
                //     clearTimeout(this.timer)
                // }
                //
                // this.timer = setTimeout(() => {
                //     this.imgIndex = i
                // },300)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .img-container {
        height: 300px;
        width: 1200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
    }

    .img-item {
        cursor: pointer;
    }

    .show-img {
        width: 600px;
        height: 300px;
        overflow: hidden;
        transition: all .3s ease;
    }

    .hide-img {
        width: 100px;
        height: 300px;
        overflow: hidden;
        transition: all .3s ease;
    }

    img {
        width: 600px;
        height: 100%;
    }

    .show-img img{
        z-index: 8;
    }

    .hide-img img {
        z-index: 1;
    }
</style>

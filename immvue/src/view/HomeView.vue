<template>
    <div class="container">
        <!--头部-->
        <div class="header">
            <div class="model-container">
                <div class="login-btn">Log</div>
                <div>/</div>
                <div class="login-btn">Reg</div>
            </div>
        </div>
        <!--背景-->
        <div class="img-container">
            <img :src="imgUrl.url" alt="" style="height: 100%; width: 100%">
            <div :class="imgUrl.className" class="btn" @click="visit()">{{date % 2 == 0 ? "Minecraft": "我的世界"}}</div>
        </div>
        <!--页脚-->
        <div class="about">
            <div>我的世界</div>
            <div>SSS</div>
            <div>SSS</div>
        </div>
        <!--登录弹窗-->
        <!--<div class="login-dialog">
            <div class="dialog-left">
                <img src="../assets/images/ks02.png" alt="" style="width: 100%; height: 100%">
            </div>
            <div class="dialog-right">
                <div class="log-title">
                    <h2>Login</h2>
                </div>
                <div class="login-container"></div>
            </div>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "HomeView",
        data() {
            return {
                date: 0,
                imgList: [
                    {
                        url: require("../assets/images/mc07.png"),
                        className: "sun"
                    }, {
                        url: require("../assets/images/mc01.png"),
                        className: "mon"
                    }, {
                        url: require("../assets/images/mc02.png"),
                        className: "tue"
                    }, {
                        url: require("../assets/images/mc03.png"),
                        className: "wed"
                    }, {
                        url: require("../assets/images/mc04.png"),
                        className: "thu"
                    }, {
                        url: require("../assets/images/mc05.png"),
                        className: "fri"
                    }, {
                        url: require("../assets/images/mc06.png"),
                        className: "sat"
                    }],
                imgUrl: {},
                showLog: false,
                showReg: false,
            }
        },
        mounted() {
            this.date = new Date().getDay()
            for (let i = 0; i < this.imgList.length; i++) {
                if ((this.date + 0) % 7 === i) {
                    this.imgUrl = this.imgList[i]
                    this.$forceUpdate()
                }
            }
        },
        methods: {
            //打开登录弹窗
            openLogDialog() {
                this.showReg = false
                this.showLog = true
            },

            closeLogDialog() {
                this.showLog = false
            },

            openRegDialog() {
                this.showLog = false
                this.showReg = true
            },

            closeRegDialog() {
                this.showReg = false
            },

            visit() {
                this.$router.push({name: "home"})
            }
        }
    }
</script>

<style lang="scss" scoped>

    .model-container {
        position: absolute;
        right: 50px;
        top: 0;
        height: 100%;
        width: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 32px;
        font-weight: 700;
    }

    .login-btn {
        width: 80px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        /*margin: 0 20px;*/
    }

    .img-container {
        width: 100vw;
        height: calc(100vh - 150px);
        overflow: hidden;
        position: relative;
        margin: 0;
        padding: 0;
        /*background-color: #42b983;*/
    }

    .about {
        height: 150px;
        width: 100vw;
        /*padding-top: 15px;*/
        background-color: black;
        color: #FBFBFB;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        line-height: 20px;
        /*position: absolute;*/
    }

    .btn {
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.2s ease-in;
        &:hover {
            transform: translateY(-50%) scale(1.2);
        }
    }

    .mon {

        left: 250px;
        background-color: rgba(186, 188, 230);
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: snow;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(186, 188, 230, .6);
        border-right: 6px solid rgba(186, 188, 230, 1);
        border-left: 6px solid rgba(182, 175, 240, .5);
        border-bottom: 6px solid rgba(182, 175, 240, .3);
    }

    .tue {
        right: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .wed {
        right: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .thu {
        left: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .fri {
        left: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .sat {
        right: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .sun {
        left: 250px;
        background-color: #7c7670;
        padding: 10px 20px;
        font-size: 32px;
        font-weight: bold;
        color: #F1E9D2;
        /*text-shadow: 4px 4px #000000;*/
        border-top: 6px solid rgba(229, 213, 192, .6);
        border-right: 6px solid rgba(229, 213, 192, 1);
        border-left: 6px solid rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .3);
    }

    .login-dialog {
        height: 650px;
        width: 900px;
        border-radius: 30px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #FFFFFF;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .dialog-left {
        width: 400px;
        height: 100%;
        background: #42b983;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dialog-right {
        width: 500px;
        height: 100%;
        background: #FFFFFF;
    }

    .log-title {
        margin-top: 30px;
        color: #333333;
    }
</style>

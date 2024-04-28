<template>
    <div class="container">
        <div class="container" id="" style="overflow-y: visible; ">
            <!--头部-->
            <div class="header">
                <flowText class="flow-text"></flowText>
                <div class="nav">
                    <div class="nav-item" v-for="(item,i) in navList" :key="i" @click="nav(item.url)" :title="item.name">
                        {{item.name}}
                    </div>
                </div>
                <!--用户-->
                <div class="user-container">
                    <div class="avatar">
                        <el-popover
                                placement="bottom"
                                :width="300"
                                trigger="hover"
                        >
                            <template #reference>
                                <img :src="userIcon ? userIcon : defaultIcon" alt="" style="height: 100%; width: 100%;">
                            </template>
                            <!--登录后-->
                            <div class="user-popover">
                                <div class="username">
                                    天才儿砸
                                </div>
                                <div class="user-lv">
                                    <div class="min-lv">
                                        Lv4
                                    </div>
                                    <div class="lv-container">
                                        <div class="ac-lv" ref="lv"></div>
                                    </div>
                                    <div class="max-lv">
                                        Lv5
                                    </div>
                                </div>
                                <div class="detail-container">
                                    <div class="detail-item">
                                        <div>30</div>
                                        <div style="font-size: 8px; font-weight: 400; color: #BFBFBF">关注</div>
                                    </div>
                                    <div class="detail-item">
                                        <div>30</div>
                                        <div style="font-size: 8px; font-weight: 400; color: #BFBFBF">粉丝</div>
                                    </div>
                                    <div class="detail-item">
                                        <div>30</div>
                                        <div style="font-size: 8px; font-weight: 400; color: #BFBFBF">动态</div>
                                    </div>
                                </div>
                                <div class="action-container"></div>
                            </div>
                        </el-popover>
                    </div>
                    <div class="weather-container">
                        <div>
                            <img style="width: 20px; height: 20px"
                                 :src="require('@/assets/images/weatherIcon' + (realWeather.icon ? realWeather.icon : '/w99.png'))"
                                 alt="">
                            <div>{{realWeather.name ? realWeather.name : '未知'}}</div>
                        </div>
                    </div>
                    <div class="edit">
                        <img src="../../assets/images/edit.png" alt="">
                    </div>
                </div>
            </div>
            <!--走马灯-->
            <div class="carousel-container">
                <carousel :imgList="imgList"></carousel>
            </div>
            <!--主体-->
            <div class="content-container">
                <!--业务范围-->
                <div class="business">
                    <syTitle :titles="titleList[0]" class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s"></syTitle>
                    <div class="bus-container">
                        <div class="bus-item wow fadeInUp" :data-wow-delay="(0.5 + i * 0.3) + 's'" v-for="(item,i) in busImgList" :key="i" >
                            <busCard :busInfo="item"></busCard>
                        </div>
                    </div>
                </div>
                <!--合伙人团队-->
                <div class="team wow fadeInUp" data-wow-duration="3s" data-wow-delay="0.5s">
                    <syTitle :titles="titleList[1]"></syTitle>
                    <div class="player-container">
                        <userCard :playerList="playerList"></userCard>
                    </div>
                </div>
                <!--客户反馈-->
                <div class="feedback wow fadeInUp" data-wow-duration="3s" data-wow-delay="0.5s">
                    <syTitle :titles="titleList[2]"></syTitle>
                </div>
                <!--孵化计划-->
                <div class="egg wow fadeInUp" data-wow-duration="3s" data-wow-delay="0.5s">
                    <syTitle :titles="titleList[3]"></syTitle>
                </div>
            </div>
            <!--底部-->
            <div class="footer"></div>
        </div>
        <div :class="showFirework ? 'firework' : 'hide-firework'" @click="backToTop()">
            <img src="../../assets/images/firework.png" alt="">
        </div>
    </div>

</template>

<script>
    import img from "@/assets/img.json"
    import players from "@/assets/player.json"
    import titles from "@/assets/titles.json"
    import weather from '@/assets/weather.json'
    import menuUrls from "@/assets/menuUrls"
    import carousel from "@/components/sy-carousel"
    import syTitle from "@/components/sy-title"
    import flowText from "@/components/sy-flow-text"
    import userCard from "@/components/sy-user-card"
    import busCard from "@/components/sy-bus-card"
    import {getCurrentInstance} from 'vue'
    import {ElMessage} from 'element-plus'
    import {baiduMap} from '@/map.js'
    import {WOW} from 'wowjs'

    export default {
        name: "MainHome",
        components: {
            carousel,
            syTitle,
            flowText,
            userCard,
            busCard,
        },
        data() {
            return {
                proxy: null,
                ak: "n7SKB1pVPz5DQmpFBGqtH34unCE60rTf",
                userIcon: require("../../assets/images/ks03.png"),
                defaultIcon: require("../../assets/logo.png"),
                minLv: 800,
                userLv: 960,
                maxLv: 1000,
                imgList: [],
                busImgList: [{
                    "id": 1,
                    "url": "/mc01.png",
                    "content": "xxxxxx",
                    "btn": "结束了 or 开始了"
                },
                    {
                        "id": 2,
                        "url": "/mc02.png",
                        "content": "xxxxxx",
                        "btn": "Minecraft"
                    },
                    {
                        "id": 3,
                        "url": "/mc03.png",
                        "content": "xxxxxx",
                        "btn": "冒险开始"
                    },
                    {
                        "id": 4,
                        "url": "/mc04.png",
                        "content": "xxxxxx",
                        "btn": "致富之路"
                    },
                    {
                        "id": 5,
                        "url": "/mc05.png",
                        "content": "xxxxxx",
                        "btn": "精彩人生"
                    },
                    {
                        "id": 6,
                        "url": "/mc06.png",
                        "content": "xxxxxx",
                        "btn": "基友探索"
                    },],
                imgIndex: 0,
                isOver: false,
                playerList: [],
                titleList: [],
                navList: [],
                scrollTop: 0,
                showFirework: false,
                weatherUrl: "",
                realWeather: {},
                weatherList: [],
            }
        },
        created() {
            const {proxy} = getCurrentInstance()
            this.proxy = proxy
            let that = this;
            this.imgList = img;
            this.playerList = players;
            this.titleList = titles;
            this.navList = menuUrls;
            this.weatherList = weather
            this.$nextTick(() => {
                baiduMap(this.ak).then(() => {
                    // eslint-disable-next-line no-undef
                    let locate = new BMapGL.LocalCity()
                    locate.get(function (res) {
                        that.weatherUrl = "https://api.seniverse.com/v3/weather/now.json?key=SMApdOIZx1YbojdBX&location=" + res.name + "&language=zh-Hans&unit=c"
                        that.getWeather()
                    })
                })
            })
        },
        mounted() {
            this.calculateUserLv();
            window.addEventListener("scroll", this.scrollToTop, true)
            setInterval(this.getWeather, 60000)
            const wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: -30,
                mobile: true,
                live: true
            })
            wow.init()
        },
        methods: {
            //计算用户等级
            calculateUserLv() {
                let lvNum = (this.userLv - this.minLv) / (this.maxLv - this.minLv)
                this.$refs.lv.style.width = (lvNum * 200) + 'px'
            },

            //路由跳转
            nav(url) {
                this.$router.push({name: url})
            },

            //获取天气数据
            getWeather() {
                let that = this
                this.proxy.$http.get(this.weatherUrl).then(res => {
                    if (res.status === 200) {
                        that.realWeather = res.data.results[0].now
                        // console.log(that.realWeather)
                        for (let i = 0; i < that.weatherList.length; i++) {
                            if (that.weatherList[i].code == that.realWeather.code) {
                                that.realWeather = that.weatherList[i]
                                // console.log("天气：" + that.realWeather.name)
                                break;
                            }
                        }
                    }
                }).catch(error => {
                    ElMessage({
                        message: "错误日志：" + error,
                        type: 'error'
                    })
                })
            },

            //监听滚动事件
            scrollToTop() {
                let that = this;
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                that.scrollTop = scrollTop;
                if (scrollTop > window.outerHeight / 2) {
                    this.showFirework = true
                } else {
                    this.showFirework = false
                }
            },

            //返回顶部
            backToTop() {
                let timer = setInterval(function () {
                    let osTop =
                        document.documentElement.scrollTop || document.body.scrollTop;
                    let iSpeed = Math.floor(-osTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop =
                        osTop + iSpeed;
                    if (osTop === 0) {
                        clearInterval(timer);
                    }
                }, 30);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .firework {
        position: fixed;
        height: 54px;
        width: 54px;
        bottom: 80px;
        right: 20px;
        cursor: pointer;
        opacity: 1;
        transition: all 0.5s ease-in-out;
    }

    .firework img {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .firework img:hover {
        transform: translateY(-10px);
    }

    .firework img:hover:after {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #d51819;
        border-radius: 50%;
        position: absolute;
        bottom: 10px;
        right: 20px;
    }

    .hide-firework {
        position: fixed;
        height: 32px;
        width: 32px;
        bottom: 80px;
        right: -54px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }

    .hide-firework img {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .flow-text {
        position: absolute;
        top: 0%;
        left: 5%;
        /*transform: translateY(-50%);*/
    }

    .nav {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        /*background: #F1E9D2;*/
    }

    .nav-item {
        width: 120px;
        height: 35px;
        border-radius: 18px;
        background: #27E1C1;
        transition: all 0.5s;
        font-size: 16px;
        color: #FFFFFF;
        /*color: #DBDBDB;*/
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
    }

    .nav-item:hover {
        margin: 0px 10px;
        width: 120px;
        height: 35px;
        border-radius: 35px 0 35px 0;
        background: #27E1C1;
        font-size: 16px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-5px);
        text-shadow: 3px 3px 4px #999999;
        cursor: pointer;
    }

    .user-container {
        width: 20vw;
        height: 100%;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        /*background-color: #d51819;*/
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border: 3px solid gold;
        border-radius: 50%;
        background-color: #FFFFFF;
    }

    .avatar img {
        border-radius: 50%;
    }

    .weather-container {
        width: 60px;
        height: 100%;
        font-size: 12px;
        font-weight: 700;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .weather-container div img {
        object-fit: contain !important;
    }

    .edit {
        width: 32px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .edit img {
        width: 32px;
        height: 32px;
        cursor: pointer;
        transition: all 0.3s;
        opacity: .6;
    }

    .edit img:hover {
        transform: translateY(-10%);
        opacity: 1;
    }

    .user-popover {
    }

    .username {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 20px;
        color: #EA739A;
    }

    .user-lv {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .min-lv {
        background-color: rgba(243, 187, 140, .6);
        font-size: 4px;
        color: #FFFFFF;
        text-shadow: 2px 2px 4px rgba(243, 187, 140, 1);
        border-radius: 12px 12px 12px 12px;
        height: 15px;
        width: 25px;
        padding: 0 2px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .lv-container {
        width: 200px;
        height: 4px;
        border-radius: 3px;
        background-color: rgba(202, 202, 202, .6);
    }

    .ac-lv {
        width: 20px;
        height: 4px;
        border-radius: 3px;
        background-color: rgba(243, 187, 140, 1);
    }

    .max-lv {
        background-color: rgba(202, 202, 202, .6);
        font-size: 4px;
        color: #FFFFFF;
        text-shadow: 2px 2px 4px rgba(202, 202, 202, 1);
        border-radius: 12px 12px 12px 12px;
        height: 15px;
        width: 25px;
        padding: 0 2px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .detail-container {
        width: 90%;
        height: 60px;
        margin: 5px 5%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .detail-item {
        width: 90px;
        height: 40px;
        border-right: 1px solid #DFDFDF;
        text-align: center;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .detail-item:last-of-type {
        border: none;
    }

    .carousel-container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        margin-bottom: 100px;
    }

    .content-container {
        width: 100vw;
    }

    .business {
    }

    .bus-container {
        width: 80vw;
        /*width: calc(1920px * 0.6);*/
        margin: 0 auto;
    }

    .bus-item {
        display: inline-block;
        align-items: center;
        justify-content: center;

    }

    .bus-item-title {

    }

    .bus-item-body {
        text-indent: 20px;
        color: #7F7F7F;
        font-size: 16px;
    }

    .player-container {
        width: 100%;
    }

    .footer {
        height: 600px;
        width: 100vw;
        background-color: rgba(51, 51, 51, 1);
    }
</style>

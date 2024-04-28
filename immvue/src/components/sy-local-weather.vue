<template>
    <div class="weather-container">
        <div>
            <img style="width: 20px; height: 20px" :src="require('@/assets/images/weatherIcon' + (realWeather.icon ? realWeather.icon : '/w99.png'))" alt="">
            <div>{{realWeather.name ? realWeather.name : '未知'}}</div>
        </div>
    </div>
</template>

<script>
    import {getCurrentInstance } from 'vue'
    import {ElMessage} from 'element-plus'
    import weather from '@/assets/weather.json'
    export default {
        name: "sy-local-weather",
        props: ['weatherUrl'],
        data() {
            return {
                realWeather: {},
                proxy: null,
                timer: null,
                weatherList: [],
                locateWeather: {}
            }
        },
        mounted() {
            this.weatherList = weather
            const { proxy } = getCurrentInstance()
            this.proxy = proxy
            let that = this
            this.timer = setInterval(() => {
                that.getWeather()
            },300)
        },
        methods: {
            getWeather() {
                let that = this
                this.proxy.$http.get(this.weatherUrl).then(res => {
                    if(res.status === 200) {
                        that.realWeather = res.data.results[0].now
                        console.log(that.realWeather)
                        for(let i = 0; i< that.weatherList.length; i++) {
                            if(that.weatherList[i].code == that.realWeather.code) {
                                that.realWeather = that.weatherList[i]
                                console.log("天气：" + that.realWeather.name)
                                break;
                            }
                        }
                        clearInterval(that.timer)
                    }
                    // console.log(that.realWeather)
                }).catch(error => {
                    ElMessage( {
                        message: "错误日志：" + error,
                        type: 'error'
                    })
                    // console.log(error)
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
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

    img {
        object-fit: contain !important;
    }
</style>

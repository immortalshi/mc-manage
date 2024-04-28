<template>
    <div class="right" ref="playWndBox">
        <!-- 视频数据站位 -->
        <div
                id="playWnd"
                class="playWnd"
                :style="{
            height: playWndHeight + 'px',
            width: playWndWidth + 'px'
          }"
        ></div>

        <div @click="startPreview()">llllllllllllllllllllllllllllllllllllllllllll</div>
    </div>
</template>

<script>
    // 声明公用变量 摄像头实例对现象，为了方便引用 定义在全局
    let oWebControl = null
    var initCount = 0
    var pubKey = ''
    export default {
        name: 'videoRuntime',
        data() {
            return {
                playWndHeight: '', // 视频盒子的高度
                playWndWidth: '', // 视频盒子的宽度，
                cameraCode: "d50af72f4a8f4944953ed8e66ef6c6a1"
            }
        },
        mounted() {
            this.playWndHeight = this.$refs.playWndBox.clientHeight // 首次加载时的到父容器的高度
            this.playWndWidth = this.$refs.playWndBox.clientWidth // 首次加载时的到父容器的宽度
            this.$nextTick(() => {
                // 初始化摄像头
                this.initPlugin()
            })

            // 监听resize事件，使插件窗口尺寸跟随DIV窗口变化
            window.addEventListener('resize', () => {
                if (oWebControl != null) {
                    if (this.$refs.playWndBox)
                        oWebControl.JS_Resize(this.$refs.playWndBox.clientWidth,         this.$refs.playWndBox.clientHeight)
                }
            })
        },
        methods: {
            // 创建播放实例
            initPlugin() {
                let that = this
                oWebControl = new window.WebControl({
                    szPluginContainer: 'playWnd', // 指定容器id
                    iServicePortStart: 15900, // 指定起止端口号，建议使用该值
                    iServicePortEnd: 15909,
                    szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11', // 用于IE10使用ActiveX的clsid
                    cbConnectSuccess: () => {
                        // 创建WebControl实例成功
                        oWebControl
                            .JS_StartService('window', {
                                // WebControl实例创建成功后需要启动服务
                                dllPath: './VideoPluginConnect.dll' // 值"./VideoPluginConnect.dll"写死
                            })
                            .then(
                                function() {
                                    // 启动插件服务成功
                                    oWebControl.JS_SetWindowControlCallback({
                                        // 设置消息回调
                                        cbIntegrationCallBack: that.cbIntegrationCallBack
                                    })

                                    oWebControl.JS_CreateWnd('playWnd', 0,0).then(function() {
                                        //JS_CreateWnd创建视频播放窗口，宽高可设定  默认设置为0 消除初始化闪白问题
                                        that.init() // 创建播放实例成功后初始化
                                    })
                                },
                                function() {
                                    // 启动插件服务失败
                                }
                            )
                    },
                    cbConnectError: function() {
                        // 创建WebControl实例失败
                        oWebControl = null
                        that.$message.warning('插件未启动，正在尝试启动，请稍候...')
                        window.WebControl.JS_WakeUp('VideoWebPlugin://') // 程序未启动时执行error函数，采用wakeup来启动程序
                        initCount++
                        if (initCount < 3) {
                            setTimeout(function() {
                                that.initPlugin()
                            }, 3000)
                        } else {
                            that.$message.warning('插件启动失败，请检查插件是否安装！')
                        }
                    },
                    cbConnectClose: () => {
                        // 异常断开：bNormalClose = false
                        // JS_Disconnect正常断开：bNormalClose = true
                        console.log('cbConnectClose')
                        oWebControl = null
                    }
                })
            },
            // 初始化
            init() {
                let that = this
                this.getPubKey(() => {
                    var appkey = '28407202' //综合安防管理平台提供的appkey，必填
                    var secret = this.setEncrypt('2Qre7RvXAeNTUcabMvmF') //综合安防管理平台提供的secret，必填
                    var ip = '58.213.66.154' //综合安防管理平台IP地址，必填
                    var playMode = 0 //初始播放模式：0-预览，1-回放
                    var port = 1443 //综合安防管理平台端口，若启用HTTPS协议，默认443
                    var snapDir = 'D:\\SnapDir' //抓图存储路径
                    var videoDir = 'D:\\VideoDir' //紧急录像或录像剪辑存储路径
                    var layout = '1x1' //playMode指定模式的布局
                    var enableHTTPS = 1 //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
                    var encryptedFields = 'secret' //加密字段，默认加密领域为secret
                    var showToolbar = 1 //是否显示工具栏，0-不显示，非0-显示
                    var showSmart = 1 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
                    var buttonIDs = '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769' //自定义工具条按钮
                    // var toolBarButtonIDs = "2049,2304" // 工具栏上自定义按钮

                    oWebControl
                        .JS_RequestInterface({
                            funcName: 'init',
                            argument: JSON.stringify({
                                appkey: appkey, //API网关提供的appkey
                                secret: secret, //API网关提供的secret
                                ip: ip, //API网关IP地址
                                playMode: playMode, //播放模式（决定显示预览还是回放界面）
                                port: port, //端口
                                snapDir: snapDir, //抓图存储路径
                                videoDir: videoDir, //紧急录像或录像剪辑存储路径
                                layout: layout, //布局
                                enableHTTPS: enableHTTPS, //是否启用HTTPS协议
                                encryptedFields: encryptedFields, //加密字段
                                showToolbar: showToolbar, //是否显示工具栏
                                showSmart: showSmart, //是否显示智能信息
                                buttonIDs //自定义工具条按钮
                            })
                        })
                        .then(function(oData) {
                            console.log(oData)
                            oWebControl.JS_Resize(that.playWndWidth, that.playWndHeight) // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                            // 一进来就隐藏
                            oWebControl.JS_HideWnd() // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                        })
                })
            },
            // 获取公钥
            getPubKey(callback) {
                oWebControl
                    .JS_RequestInterface({
                        funcName: 'getRSAPubKey',
                        argument: JSON.stringify({
                            keyLength: 1024
                        })
                    })
                    .then(function(oData) {
                        console.log(oData)
                        if (oData.responseMsg.data) {
                            pubKey = oData.responseMsg.data
                            callback()
                        }
                    })
            },
            // RSA 加密
            setEncrypt(value) {
                var encrypt = new window.JSEncrypt()
                encrypt.setPublicKey(pubKey)
                return encrypt.encrypt(value)
            },
            // 回调的消息
            cbIntegrationCallBack(oData) {
                let { responseMsg: type, responseMsg: msg } = oData

                if (type === 'error') {
                    console.log(type, msg, this.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'))
                } else {
                    console.log(type, msg, this.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'))
                }
            },
            // 预览
            startPreview() {
                // 点击查询后显示
                oWebControl.JS_ShowWnd()
                var cameraIndexCode = this.cameraCode //获取输入的监控点编号值，必填
                // console.log(cameraCode)
                var streamMode = 0 //主子码流标识：0-主码流，1-子码流
                var transMode = 0 //传输协议：0-UDP，1-TCP
                var gpuMode = 0 //是否启用GPU硬解，0-不启用，1-启用
                var wndId = -1 //播放窗口序号（在2x2以上布局下可指定播放窗口）

                cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, '')
                cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, '')

                oWebControl.JS_RequestInterface({
                    funcName: 'startPreview',
                    argument: JSON.stringify({
                        cameraIndexCode: cameraIndexCode, //监控点编号
                        streamMode: streamMode, //主子码流标识
                        transMode: transMode, //传输协议
                        gpuMode: gpuMode, //是否开启GPU硬解
                        wndId: wndId //可指定播放窗口
                    })
                })
            },
            // 停止全部预览
            stopAllPreview() {
                oWebControl.JS_RequestInterface({
                    funcName: 'stopAllPreview'
                })
            },

            // 格式化时间
            dateFormat(oDate, fmt) {
                var o = {
                    "M+": oDate.getMonth() + 1, //月份
                    "d+": oDate.getDate(), //日
                    "h+": oDate.getHours(), //小时
                    "m+": oDate.getMinutes(), //分
                    "s+": oDate.getSeconds(), //秒
                    "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
                    "S": oDate.getMilliseconds()//毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
        },
        destroyeds() { // 组件销毁后
            if (oWebControl != null) {
                oWebControl.JS_HideWnd() // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                oWebControl.JS_RequestInterface({funcName: "destroyWnd"}) // 销毁当前播放的视频
                oWebControl.JS_Disconnect() // 断开与插件服务连接
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        width: 100vw;
    }
</style>

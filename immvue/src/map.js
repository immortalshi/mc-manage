export function baiduMap(ak) {
    return new Promise(function (resolve, reject) {
        window.baiduMap = function () {
            resolve()
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?type=webgl&v=3.0&ak=${ak}&callback=baiduMap`
        script.onerror = reject
        document.head.appendChild(script)
    })
}
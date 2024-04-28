import { createApp } from 'vue'
import App from './App.vue'
// import router from 'vue-router'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {useRouter} from 'vue-router'
import vView from 'vue-view-lazy'
import Axios from 'axios'


const app = createApp(App)
app.config.globalProperties.$router = useRouter()
app.config.globalProperties.$http = Axios
app.use(vView,{
    error: './assets/images/null.png',
    loading: './assets/images/loading.gif'
})


app.use(router).use(ElementPlus).mount('#app')

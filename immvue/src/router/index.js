import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/view/HomeView";
import AboutView from "@/view/AboutView";
import MainHome from "@/view/main/MainHome";


const routes = [{
    path: '/',
    name: 'login',
    component: HomeView,
}, {
    path: '/about',
    name: 'about',
    component: AboutView,
}, {
    path: '/mainHome',
    name: 'home',
    component: MainHome
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

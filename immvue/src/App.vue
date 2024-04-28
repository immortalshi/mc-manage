<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  <HomeView></HomeView>-->
  <div id="app">
    <!-- 路由映射的组件将在这里渲染 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomeView from "@/view/HomeView";
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HomeView
    // HelloWorld
  }
}
</script>

<style>
  @import "@/assets/css/main.css";
  @import "~wowjs/css/libs/animate.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>

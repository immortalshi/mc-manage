<template>
    <div class="com-container">
        <h2 class="title">{{titles.title}}</h2>
        <p class="sub-title" :title="titles.hide">{{titles.subTitle}}</p>
    </div>
</template>

<script>
    export default {
        name: "sy-title",
        props:["titles"]
    }
</script>

<style scoped>
    .com-container {
        text-align: center;
        position: relative;
        width: 60%;
        margin: 0 20%;
    }

    .title {
        line-height: 12px;
    }

    .sub-title {
        color: #999999;
    }
</style>

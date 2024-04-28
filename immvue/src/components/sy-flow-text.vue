<template>
    <div class="text-container">
        <span style="--i:0">M</span>
        <span style="--i:2">i</span>
        <span style="--i:4">n</span>
        <span style="--i:6">e</span>
        <span style="--i:8">c</span>
        <span style="--i:10">r</span>
        <span style="--i:12">a</span>
        <span style="--i:14">f</span>
        <span style="--i:16">t</span>
    </div>
</template>

<script>
    export default {
        name: "sy-flow-text"
    }
</script>

<style lang="scss" scoped>
    .text-container {
        /*background-color: rgba(225, 225, 225, .3);*/
        text-align: center;
    }

    .text-container span {
        font-size: 40px;
        font-weight: 700;
        line-height: 40px;
        font-style: italic;
        color: #E8E8EA;
        display: inline-block;
        align-self: center;
        /*letter-spacing:8px;*/
        animation: animate 3s ease-in-out infinite both;
        animation-delay: calc(var(--i) * 120ms);
    }

    @keyframes animate {
        0% {
            transform: translateY(55%) rotate(4deg);
        }
        33.3% {

        }
        50% {
            transform: translateY(0) rotate(4deg);
        }
        66.6% {

        }
        100% {
            transform: translateY(55%) rotate(4deg);
        }
    }
</style>

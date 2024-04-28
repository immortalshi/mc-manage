<template>
    <div class="container">
        <div class="banner-container" ref="banner">
            <div class="banner">
                <!--<img class="morning" src="@/assets/images/gradient/morning.png" alt="">-->
                <img class="afternoon" src="@/assets/images/gradient/afternoon.png" alt="" @mouseenter="mouseenter" @mousemove="mouseMove" @mouseleave="mouseleave">
                <img class="evening" src="@/assets/images/gradient/evening.png" alt="" @mouseenter="mouseenter" @mousemove="mouseMove" @mouseleave="mouseleave">
                <img class="night" src="@/assets/images/gradient/night.png" alt="" @mouseenter="mouseenter" @mousemove="mouseMove" @mouseleave="mouseleave">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sy-gradient-banner",
        data() {
            return {
                startPosition: null,
            };
        },
        methods: {
            mouseenter(e) {
                this.startPosition = e.clientX
                this.$refs.banner.classList.add('moving')
            },
            mouseMove(e) {
                let percentage = (e.clientX - this.startPosition) /window.outerWidth + 0.5
                this.$refs.banner.style.setProperty('--percentage', percentage)
            },
            mouseleave() {
                this.$refs.banner.classList.remove('moving')
                this.$refs.banner.style.setProperty('--percentage', 0.5)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        position: relative;
    }
    .banner-container {
        width: 100vw;
        height: 300px;
        overflow: hidden;

        --percentage: 0.5;

        .banner {
            height: inherit;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateX(calc(var(--percentage) * 100px));

            img {
                position: absolute;
                display: block;
                width: 120%;
                height: inherit;
                object-fit: cover;
            }
        }
    }

    .morning {
        z-index: 40;
        opacity: calc(1 - (var(--percentage) - 0.2)/ 0.2);
    }

    .afternoon {
        z-index: 30;
        opacity: calc(1 - (var(--percentage) - 0.25)/ 0.25);
        transition: 1s all ease-in;
    }

    .evening {
        z-index: 20;
        opacity: calc(1 - (var(--percentage) - 0.5)/ 0.5);
        transition: 1s all ease-in;
    }

    .night {
        z-index: 10;
    }

    .moving {
        .afternoon, .evening {
            transition: none;
        }
    }
</style>
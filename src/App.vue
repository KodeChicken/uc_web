<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    #app {
        height: 100vh;
    }

    body {
        margin: 0;
    }

    .el-dialog__header {
        background-color: rgb(158, 153, 158);
    }

</style>

<script>
    export default {
        data() {
            return {}
        },
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            }
            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state))
            })
        }
    };
</script>
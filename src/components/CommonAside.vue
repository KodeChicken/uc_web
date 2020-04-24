<template>
    <div>
        <!--  TODO: navMenu的name是英文的，用于路由的跳转，alias属性用于中文的别名      -->
            <el-menu
                    router
                    background-color="#545c64"
                    text-color="#rgb(19, 9, 9)"
                    active-text-color="green">
                <common-aside-item v-for="menu in navMenus" :key="menu.id" :item="menu" />
            </el-menu>
    </div>
</template>

<script>
    import CommonAsideItem from "./CommonAsideItem";

    export default {
        props: ['navMenus'],
        data() {
            return {
            }
        },
        components: {
            CommonAsideItem
        },
        created() {
            console.log('6666', this.$route.path);
        },
        methods: {

        }

    }
</script>

<style scoped>
    .el-menu {
        height: 100%;
        border: 0px;
    }





</style>
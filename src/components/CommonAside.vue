<template>
    <div>
        <!--  TODO: navMenu的name是英文的，用于路由的跳转，alias属性用于中文的别名      -->
        <el-menu
           router
            background-color="#545c64"
            text-color="#rgb(19, 9, 9)">
            <common-aside-item v-for="menu in menuList" :key="menu.uri" :item="menu" />
        </el-menu>
    </div>
</template>

<script>
    import CommonAsideItem from "./CommonAsideItem";
    import {curMenus} from "../js/menus";
    export default {
        data() {
            return {
                menuList: []
            }
        },
        components: {
            CommonAsideItem
        },
        created() {
            this.findMenuTree()

            console.log('6666', this.$route.path);
        },
        methods: {
            findMenuTree() {
                curMenus().then(res => {
                    this.menuList = res.data
                    console.log('menuList: ',this.menuList)
                }).catch(err => {
                    console.log(err)
                })
            }
        }

    }
</script>

<style scoped>
    .el-menu {
        height: 100%;
        border: 0px;
    }





</style>
<template>
    <el-container style="height: 100%">
        <el-aside width="200px" style="background-color: rgba(158, 153, 158, 1);">
            <common-aside :navMenus="menuList"></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <common-header/>
            </el-header>
            <!--            <common-tab/>-->
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CommonHeader from "../components/CommonHeader";
    import CommonAside from "../components/CommonAside";
    import CommonTab from "../components/CommonTab";

    export default {
        data() {
            return {
                menuList: [],
            }
        },

        created() {
            this.findMenuTree()
        },
        methods: {
            findMenuTree() {
                axios.post('/user/curMenus').then(res => {
                    debugger
                    this.menuList = res.data
                }).catch(err => {
                    if (err.isAxiosError) {
                        localStorage.removeItem("Authorization")
                        this.$router.push('/networkErr');
                    }
                    if (err.data.code === 603) {
                        localStorage.removeItem("Authorization")
                        this.$router.push('/login')
                    }
                })
            }
        },
        components: {
            CommonHeader,
            CommonAside,
            // CommonTab
        }
    }
</script>

<style lang="scss" scoped>

    .el-header {
        background-color: rgb(137, 165, 197);
        color: #333;
        display: flex;
        align-items: center;
    }

    .el-aside {
        color: #333;
        background-color: #fff;
    }

</style>
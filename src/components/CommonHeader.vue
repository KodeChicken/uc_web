<template>
    <header>
        <el-header style="text-align: right; font-size: 12px">
            <div class="l-content">
                <el-breadcrumb separator="/" style="border-right: none" width="200px">
                    <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item ><a href="/">活动管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="profileClass">
                <el-dropdown trigger="click" size="mini">
                    <span class="el-dropdown-link"><img :src="userImg" alt="用户头像" class="userImg"></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-check">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="userName">
                    <span>祝友政</span>
                </div>
            </div>
        </el-header>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                // breadList: [
                //     {path: '/userList', name: '用户列表'}
                // ],
                // bread: {
                //     path: '',
                //     name: ''
                // },
                userImg: require('../assets/headPortrait.jpeg')
            }
        },
        watch: {
            // $route() {
            //     this.getBreadCrumb()
            // }
        },
        methods: {
            // getBreadCrumb() {
            //     const aaa = {
            //         path: this.$route.fullPath,
            //         name: this.$route.name
            //     }
            //     this.breadList.push(aaa)
            //     console.log('this.breadList: ', this.breadList)
            //     const path = 'path'
            //     this.breadList = this.breadList.reduce((item, next) =>
            //         item.some(i => i[path] == next[path]) ? item : [...item, next], [])
            //     console.log('getbreadCurmb1: ', this.breadList)
            // }
        },
    }
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 100%;
        align-items: center;
    }
    .l-content {
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }
    .profileClass {
        .userImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .userName {
            float: right;
            margin-left: 10px;
            margin-top: 12px;
        }
        position: fixed;
        right: 50px;
        text-align: center;

    }
</style>

<style lang="scss">


</style>
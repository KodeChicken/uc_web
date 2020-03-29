<template>
    <el-container style="height: 800px; border: 1px solid #eee" class="test">
        <el-aside width="200px" style="background-color: rgba(158, 153, 158, 1);">
            <el-menu router :default-openeds="['0', '1']" background-color="#ecf5ff" style="border-right: none" >
                <el-submenu v-for="(item, index) in $router.options.routes" :index="index + ''">
                    <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                    <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path"
                    :class="$route.path == item2.path ? 'is-active' : ''">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{item2.name}}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>

    export default {
    }
</script>

<style scoped>

</style>
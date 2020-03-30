<template>
    <div>
        <el-menu router default-active="2" background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b">
            <el-submenu :index="item.path" v-for="(item, index) in hasChildren" :key="index">
                <template slot="title">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                            :index="subItem.path"
                            v-for="(subItem, index) in item.children"
                            :key="index"
                            :style="$route.path == subItem.path ? 'color: #ffd04b;' : ''">
                        <i :class="'el-icon-' + subItem.icon"></i>
                        <span slot="title"> {{subItem.label}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path"
                          :class="$route.path == item.path ? 'is-active' : ''">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed: {
            noChildren() {
                return this.asideMenu.filter(item => !item.children)
            },
            hasChildren() {
                return this.asideMenu.filter(item => item.children)
            },
        },
        data() {
            return {
                asideMenu: [
                    {
                        path: '/',
                        label: '用户管理',
                        icon: 'menu',
                        children: [
                            {
                                path: '/userList',
                                label: '用户列表',
                                icon: 'user'
                            },
                            {
                                path: '/aclAdmin',
                                label: '权限管理',
                                icon: 's-operation'
                            }
                        ]
                    },
                    {
                        path: '/navigation1',
                        label: '导航1',
                        icon: 's-flag',
                        children: [
                            {
                                path: '/pageThree',
                                label: '页面3',
                                icon: 'setting'
                            },
                            {
                                path: '/pageFour',
                                label: '页面4',
                                icon: 'setting'
                            }
                        ]
                    },
                    {
                        path: '/navigation2',
                        label: '导航2',
                        icon: 's-data',
                        children: [
                            {
                                path: '/pageFive',
                                label: '页面5',
                                icon: 'setting'
                            }
                        ]
                    }
                ]
            }
        },

    }
</script>

<style lang="scss" scoped>

    .el-menu {
        height: 100%;
        border: none;
    }

</style>
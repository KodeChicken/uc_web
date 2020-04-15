<template>
    <div v-if="item.childrens">
        <template v-if="item.childrens.length == 0">
            <el-menu-item :index="item.uri">
                <i class="el-icon-menu"></i>
                {{item.name}}
            </el-menu-item>
        </template>

        <el-submenu v-else :index="item.uri">
            <template slot="title" >
                <i class="el-icon-menu"></i>
                {{item.name}}
            </template>

            <template v-for="child in item.childrens">
                <common-aside-item
                        v-if="child.childrens && child.childrens.length > 0"
                        :item="child"
                        :key="child.id"/>
                <el-menu-item v-else :key="child.id" :index="child.uri" :class="$route.path == child.uri ? 'is-active' : ''">
                    <i class="el-icon-location"></i>
                    {{child.name}}
                </el-menu-item>
            </template>
        </el-submenu>
    </div>

</template>

<script>
    export default {
        name: 'CommonAsideItem',
        props: ['item']
    }
</script>

<style scoped>

</style>
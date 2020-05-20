<template>
    <div>
        <el-table
                ref="roleMultable"
                :data="roleList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @select="singleSelect">
            <el-table-column
                    type="selection"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="角色名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    width="100px"
                    prop="code"
                    label="角色代码"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="描述"
                    align="center"
                    style="font-size: 10px">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next, sizes, total, jumper"
                :page-sizes="[3, 9, 12, 15]"
                :page-size="pageParam.pageSize"
                :total="pageParam.pageTotal"
                align="center" style="margin-top: 50px"
                @current-change="pageChange"
                @size-change="sizeChange">
        </el-pagination>
    </div>
</template>

<script>
    import {findRolesByUserId} from "../js/userList";

    export default {
        props: ['selectUserId'],
        data() {
            return {
                roleList: [],
                multipleSelection: [],
                tempSelect: [],
                // 分页参数
                pageParam: {
                    pageNum: 1,
                    pageSize: 3,
                    pageTotal: 0
                },
            }
        },
        watch: {
            'pageParam.pageTotal': {
                handler(value) {
                    if (value == (this.pageParam.pageNum - 1) * this.pageParam.pageSize
                        && this.pageParam.pageTotal != 0) {
                        this.pageParam.pageNum -= 1;
                    }
                    // 判断pageTotal的值是否未改变，避免重复调用getAllUser方法
                    if (this.pageParam.pageTotal != value) {
                        //获取列表数据
                        this.findRolesByUserId();
                    }
                },
                // pageTotal首次赋值不触发watch
                immediate: false
            },
        },
        created() {
        },
        methods: {
            singleSelect(rows, val) {
                // rows为当前表格中选中的值,直接赋值给multipleSelection
                this.multipleSelection = rows;
            },
            handleSelectionChange(val) {
                val.forEach(obj => {
                    this.multipleSelection.push(obj);
                });
                this.distinctMultipleSelect();
            },
            distinctMultipleSelect() {
                let hash = {};
                this.multipleSelection = this.multipleSelection.reduceRight((item, next) => {
                    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                    return item
                }, []);
            },
            pageChange(pageNum) {
                this.pageParam.pageNum = pageNum;
                this.findRolesByUserId();
            },
            sizeChange(currentSize) {
                this.pageParam.pageSize = currentSize
                this.findRolesByUserId()
            },
            findRolesByUserId() {
               findRolesByUserId(this.selectUserId, this.pageParam.pageNum, this.pageParam.pageSize).then(res => {
                   this.roleList = res.data.allRoles.list;
                   this.pageParam.pageTotal = res.data.allRoles.total;
                   this.multipleSelection = res.data.curUserRoles;
                   this.initSelect();
               }).catch(err => {
                    console.log(err)
               })
           },
           // 初始化默认选中已有角色
           initSelect() {
                this.$nextTick(()=>{
                    this.roleList.forEach((obj) => {
                        this.multipleSelection.forEach(obj2 => {
                            if (obj.id === obj2.id) {
                                this.$refs.roleMultable.toggleRowSelection(obj, true)
                            }
                        });
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
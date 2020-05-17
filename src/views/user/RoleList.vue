<template>
    <div>
        <div id="role-table">
            <el-table
                    ref="multipleTable"
                    :data="roleTableData"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        prop="id"
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
                        style="font-size: 10px"
                >
                </el-table-column>
                <el-table-column
                        label="是否启用"
                        align="center">
                    <template v-slot="scope">
                        <el-switch
                                v-model="scope.row.enabled"
                                :active-value="1"
                                :disabled="false"
                                :inactive-value="0"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeEnabled(scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" @click="editUserInfo(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteUserInfo(scope.row)" v-show="isNotDel(scope.row)"
                                   style="margin-right: 5px">删除
                        </el-button>
                    </template>
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
    </div>
</template>

<script>
    import {findAllRole} from "../../js/role";

    export default {
        data() {
            return {
                // 分页参数
                pageParam: {
                    pageNum: 1,
                    pageSize: 3,
                    pageTotal: 0
                },
                // 用户列表
                roleTableData: [],
                multipleSelection: [],
            }
        },
        created() {
            this.findAllRoleList();
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
                        this.findAllRole();
                    }
                },
                // pageTotal首次赋值不触发watch
                immediate: false
            }
        },
        methods: {
            pageChange(pageNum) {
                this.pageParam.pageNum = pageNum;
                this.findAllRoleList();
                console.log('pageChange.pageNum: ', this.pageParam.pageNum);
            },
            sizeChange(currentSize) {
                this.pageParam.pageSize = currentSize
                this.findAllRoleList()
                console.log('sizeChange.currentSize: ', this.pageParam.pageSize);
            },
            changeEnabled(row) {

            },
            findAllRoleList() {
                findAllRole(this.pageParam.pageNum, this.pageParam.pageSize)
                    .then(res => {
                        this.roleTableData = res.data.list;
                        this.pageParam.pageTotal = res.data.total;
                        this.$utils.messageTips(1000, '获取角色列表success', 'success');
                        console.log("findAllRole.roleTableData: ", this.roleTableData);
                    }).catch(err => console.log(err));
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            isNotDel(row) {
                let noDel = ['000', '100', '101', '200']
                let number = noDel.findIndex(obj => obj == row.code);
                if (number === 0) {
                    return false;
                }
                return !number;
            },

        }
    }
</script>


<style scoped>

    #role-table {
        margin-top: 10px;
    }
</style>
<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="userTableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    prop="id"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="编号"
                    width="50px"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="是否启用"
                    width="70px"
                    align="center">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.open"
                            :active-value="true"
                            :inactive-value="false"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeSwitch(scope.row)"/>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="150px"
                    align="center">
                <template v-slot="scope">
                    <el-button size="mini" type="primary" @click="editUserInfo(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUserInfo(scope.row)" style="margin-right: 5px">删除</el-button>
                    <!-- Form -->
                    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
                        <el-form :model="userForm">
                            <el-form-item label="名称" :label-width="formLabelWidth">
                                <el-input v-model="userForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input v-model="userForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" :label-width="formLabelWidth">
                                <el-input v-model="userForm.address" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth" :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                                <el-input v-model="userForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cacelDialogForm">取 消</el-button>
                            <el-button type="primary" @click="confirmDialogForm">确 定</el-button>
                        </div>
                    </el-dialog>
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
        <common ref="common"></common>
    </div>
</template>

<script>
    import Common from "../../common/Common";
    export default {
        data() {
            return {
                // 分页参数
                pageParam: {
                    pageNum: 1,
                    pageSize: 3,
                    pageTotal: 0
                },
                // 
                userTableData: [],
                multipleSelection: [],
                userForm: {
                    name: '',
                    password: '',
                    address: '',
                    email: ''
                },
                dialogFormVisible: false,
                formLabelWidth: '60px'
            }
        },
        created() {
            this.getAllUser()
        },
        watch: {
            'pageParam.pageTotal': {
                handler(value) {
                    if (value == (this.pageParam.pageNum - 1) * this.pageParam.pageSize
                        && this.pageParam.pageTotal != 0) {
                        this.pageParam.pageNum -= 1;
                    }
                    //获取列表数据
                    this.getAllUser();
                },
                // pageTotal首次赋值不触发watch
                immediate: false
            }
        },
        methods: {
            changeSwitch(row){
                const id = row.id
                const open = row.open
                console.log('row: ', row)
                console.log('id: ', id)
                console.log('open: ', open)
                axios.put('/user/updateOpen/' + id + '/' + open)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$refs.common.messageTips(1000, '是否启动: 更新成功', 'success')
                        } else {
                            this.$refs.common.messageTips(1000, '是否启动: 更新失败', 'error')
                        }
                    })
                    .catch(err => {})

            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            // 编辑用户
            editUserInfo(row) {
                console.log(row.id);
                //显示弹框
                this.dialogFormVisible = true;
                axios.get('/user/findUser/' + row.id)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.userForm = res.data.data
                            console.log(this.userForm);
                            this.$refs.common.messageTips(1000, '查询用户成功', 'success')
                        } else {
                            this.$refs.common.messageTips(1000, '未找到用户信息', 'error')
                        }
                    })

            },
            confirmDialogForm() {
                this.dialogFormVisible = false
                    axios.put('/user/update', this.userForm)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.userForm = res.data.data
                                this.$refs.common.messageTips(1000, '更新用户成功', 'success')
                                return Promise.resolve()
                            } else {
                                this.$refs.common.messageTips(1000, '更新用户失败', 'error')
                                return Promise.reject(res)
                            }
                        })
                        .then(this.getAllUser())
                        .catch(err => {
                            this.$refs.common.messageTips(1000, err, 'error')
                        })
            },
            cacelDialogForm() {
                this.dialogFormVisible = false
                this.userForm = {
                    name: '',
                    password: '',
                    address: '',
                    email: ''
                }
            },
            // dialogFormVisible = false
            // 删除用户
            deleteUserInfo(row) {
                this.deleteUserById(row)
            },
            handleClick(id) {
                console.log(id);
            },
            pageChange(pageNum) {
                this.pageParam.pageNum = pageNum
                this.getAllUser()
                console.log('pageChange.pageNum: ', this.pageParam.pageNum);

            },
            sizeChange(currentSize) {
                this.pageParam.pageSize = currentSize
                this.getAllUser()
                console.log('sizeChange.currentSize: ', this.pageParam.pageSize);
            },
            // 分页查询用户
            getAllUser() {
                axios.get("http://localhost:8080/user/findAll/"
                    + this.pageParam.pageNum + "/" + this.pageParam.pageSize)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.userTableData = response.data.data.list
                            this.pageParam.pageTotal = response.data.data.total
                            console.log("getAllUser.tableData: ", this.userTableData)
                            console.log('getAllUser.token: ', window.localStorage.getItem("token"))
                            console.log('response: ', response);
                        }
                    })
                    .catch(error => {
                        this.$refs.common.messageTips(1000, '获取用户列表失败', 'error')
                    })
            },
            // 根据用户id删除用户
            deleteUserById(row) {
                this.$refs.common.confirmTips(row.name, '提示').then(() => {
                    axios.delete("http://localhost:8080/user/delete/" + row.id)
                        .then(response => {
                            console.log(response.data.msg);
                            if (response.data.code == 200) {
                                this.$refs.common.messageTips(1000, '删除用户成功', 'success')
                                if (this.pageParam.pageTotal != response.data.data) {
                                    this.pageParam.pageTotal = response.data.data
                                }
                            }
                        })
                        .catch(error => {
                            this.$refs.common.messageTips(1000, '删除用户失败', 'error')
                        })
                }).catch(() => {})
            }
        },
        components: {
            Common,
        }
    }
</script>
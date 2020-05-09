<template>
    <div>
        <div id="button-group">
            <el-autocomplete
                    class="inline-input"
                    v-model="userInfo"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSearchSelect"
                    size="mini"></el-autocomplete>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-tooltip class="item" effect="dark" content="只能上传excel格式的文件" placement="top-start">
                    <el-button size="mini" type="primary">点击上传</el-button>
                </el-tooltip>
            </el-upload>
        </div>
        <div id="user-table">
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
                        prop="username"
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
                        prop="phone"
                        label="联系方式"
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
                                v-model="scope.row.status"
                                :active-value="1"
                                :disabled="false"
                                :inactive-value="0"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeSwitch(scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200px"
                        align="center">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" @click="editUserInfo(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteUserInfo(scope.row)"
                                   style="margin-right: 5px">
                            删除
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
        <!-- Form -->
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="25%"
                   :close-on-click-modal="false">
            <el-form :model="userForm">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="userForm.fullname" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.password" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="userForm.address" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input v-model="userForm.email" autocomplete="off" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cacelDialogForm">取 消</el-button>
                <el-button type="primary" @click="confirmDialogForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {findAllUser, findUserById, deleteUserById, updateUser, updateUserStatus} from "../../js/userList.js"

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
                userTableData: [],
                // 搜索框中输入值
                userInfo: '',
                // 搜索框下拉存储的用户名称
                restaurants: [],
                // 上传文件集合
                fileList: [],
                // 用户table中多选存储的用户Id
                multipleSelection: [],
                // 用户表单信息
                userForm: {
                    name: '',
                    password: '',
                    address: '',
                    email: ''
                },
                // 是否显示弹出框
                dialogFormVisible: false,
                // 弹出框中form表单label字体的宽度
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
                    // 判断pageTotal的值是否未改变，避免重复调用getAllUser方法
                    if (this.pageParam.pageTotal != value) {
                        //获取列表数据
                        this.getAllUser();
                    }
                },
                // pageTotal首次赋值不触发watch
                immediate: false
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSearchSelect(item) {
                console.log(item);
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            changeSwitch(row) {
                let id = row.id
                let status = row.status
                updateUserStatus(id, status)
                    .then(res => {
                        if (res.code == 200) {
                            this.$utils.messageTips(1000, '是否启动: 更新成功', 'success')
                        } else {
                            this.$utils.messageTips(1000, '是否启动: 更新失败', 'error')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
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
                findUserById(row.id)
                    .then(res => {
                        if (res.code == 200) {
                            this.userForm = res.data
                            console.log(this.userForm);
                            this.$utils.messageTips(1000, '查询用户成功', 'success')
                        } else {
                            this.$utils.messageTips(1000, '未找到用户信息', 'error')
                        }
                    })

            },
            confirmDialogForm() {
                this.dialogFormVisible = false
                updateUser(this.userForm)
                    .then(res => {
                        if (res.code == 200) {
                            this.userForm = res.data
                            this.$utils.messageTips(1000, '更新用户成功', 'success')
                            return Promise.resolve()
                        } else {
                            this.$utils.messageTips(1000, '更新用户失败', 'error')
                            return Promise.reject(res)
                        }
                    })
                    .then(this.getAllUser())
                    .catch(err => {
                        this.$utils.messageTips(1000, '更新用户失败', 'error')
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
                findAllUser(this.pageParam.pageNum, this.pageParam.pageSize).then(res => {
                    if (res.code == 200) {
                        this.userTableData = res.data.list
                        this.restaurants = this.userTableData.map((item) => {
                            return {"value": item.username}
                        });
                        this.pageParam.pageTotal = res.data.total
                        this.$utils.messageTips(1000, '获取用户列表success', 'success')
                        console.log("getAllUser.tableData: ", this.userTableData)
                        console.log("getAllUser.restaurants: ", this.restaurants)
                    }
                }).catch(err => {
                    this.$utils.messageTips(1000, '获取用户列表失败', 'error')
                })
            },
            // 根据用户id删除用户
            deleteUserById(row) {
                this.$utils.confirmTips(row.name, '提示').then(() => {
                    deleteUserById(row.id).then(response => {
                        console.log(response.data.msg);
                        if (response.data.code == 200) {
                            if (this.pageParam.pageTotal != response.data) {
                                this.pageParam.pageTotal = response.data
                            }
                            this.$utils.messageTips(1000, '删除用户成功', 'success')
                        }
                    }).catch(err => {
                        this.$utils.messageTips(1000, '删除用户失败', 'error')
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    #button-group {

    }

    #user-table {
        margin-top: 10px;
    }

    .el-button--mini {
        margin-left: 10px;
    }

    .upload-demo {
        display: inline;

    }

    .el-input--small {
        width: 320px;
    }


</style>

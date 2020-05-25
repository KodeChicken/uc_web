<template>
    <div>
        <el-row>
            <el-upload
                    class="upload-demo"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :file-list="fileList">
                <el-tooltip class="item" effect="dark" content="只能上传excel格式的文件" placement="top-start">
                    <el-button size="mini" type="primary">点击上传</el-button>
                </el-tooltip>
            </el-upload>
            <el-button class="add-user-class" size="mini" type="primary" @click="addUser">添加用户</el-button>
            <el-autocomplete
                    class="inline-input"
                    v-model="userInfo"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSearchSelect"
                    size="mini">
            </el-autocomplete>
        </el-row>
        <div id="user-table">
            <el-table
                    ref="userTable"
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
                        width="300px"
                        align="center">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" @click="addRoles(scope.row)">添加角色</el-button>
                        <el-button size="mini" type="primary" @click="editUserInfo(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteUserInfo(scope.row)"
                                   style="margin-right: 5px" v-show="checkPermit('user:delete')">删除
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
        <el-dialog title="用户信息" :visible.sync="editUserInfoDialog" width="25%"
                   :close-on-click-modal="false" class="dialogClass">
            <el-form :model="userForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userForm.username" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.password" autocomplete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="userForm.email" type="email"
                              size="small"
                              :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="userForm.phone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="userForm.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birthday"
                                    size="small"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cacelDialogForm">取 消</el-button>
                <el-button type="primary" @click="confirmDialogForm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="角色列表" :visible.sync="isShowRoles" width="25%"
                   :close-on-click-modal="false" class="dialogClass">
            <common-add-role ref="roles" :selectUserId="selectUserId" :isShowRoles="isShowRoles"></common-add-role>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cacelRoles">取 消</el-button>
                <el-button type="primary" @click="confirmRoles">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        findAllUser, findUserById, deleteUserById, updateUser,
        updateUserStatus, updateUserRoles, uploadUserFile
    } from "../../js/userList.js"
    import {registry} from "../../js/login";
    import {mapState, mapGetters} from 'vuex'
    import CommonAddRole from "../../components/CommonAddRole";
    import {importData} from "../../common/excel";

    export default {
        components: {
            CommonAddRole,
        },
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
                userForm: {},
                permissions: [],
                // 是否显示弹出框
                editUserInfoDialog: false,
                // 是否显示角色弹出框
                isShowRoles: false,
                // 是否为添加用户操作
                isAdd: false,
                // 是否显示添加用户框
                // 弹出框中form表单label字体的宽度
                formLabelWidth: '70px',
                selectUserId: '',
                isShowRoles: false,

                importHeaders: {
                    entryType: 'multipart/form-data'
                },

            }
        },
        created() {
            this.getAllUser();
        },
        mounted() {
        },
        computed: {
            ...mapGetters([
                'getPermits'
            ]),
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
            uploadFile(item) {
                // 通过DOM取文件数据
                importData(item.file, {username: '', password: ''}).then(para => {
                    uploadUserFile(para).then(res => {
                        this.$utils.messageTips(1000, '导入用户成功', 'success');
                        this.fileList = [];
                        this.getAllUser();
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))

            },


            addUser() {
                this.editUserInfoDialog = true;
                this.isAdd = true;
            },
            checkPermit(val) {
                let permits = this.getPermits;
                if (val && permits.length > 0) {
                    let ts = permits.filter(item => {
                        return item === val;
                    });
                    return ts.length > 0;
                }
                return false;
            },
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
                return this.$confirm(`确定移除 ${file.name}？`);
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
                let id = row.id;
                let status = row.status;
                updateUserStatus(id, status).then(res => {
                    if (res.code == 200) {
                        this.$utils.messageTips(1000, '是否启动: 更新成功', 'success');
                    } else {
                        this.$utils.messageTips(1000, '是否启动: 更新失败', 'error');
                    }
                }).catch(err => {
                    console.log(err);
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
                this.editUserInfoDialog = true;
                findUserById(row.id).then(res => {
                    this.userForm = res.data;
                    this.userForm.sex = this.userForm.sex.toString()
                    console.log('findUserById: ', this.userForm);
                    this.$utils.messageTips(1000, '查询用户成功', 'success');
                }).catch(err => {
                    console.log(err);
                    this.$utils.messageTips(1000, '未找到用户信息', 'error');
                })
            },
            confirmDialogForm() {
                this.editUserInfoDialog = false;
                if (this.isAdd) {
                    registry(this.userForm).then(res => {
                        this.$utils.messageTips(1000, '添加用户成功', 'success');
                        this.getAllUser();
                        this.userForm = {};
                    }).catch(err => console.log(err))
                } else {
                    updateUser(this.userForm).then(res => {
                        this.userForm = res.data;
                        this.$utils.messageTips(1000, '更新用户成功', 'success');
                    }).then(this.getAllUser()).catch(err => {
                        this.$utils.messageTips(1000, '更新用户失败', 'error');
                    })
                }
            },
            cacelDialogForm() {
                this.editUserInfoDialog = false;
                this.userForm = {};
            },
            confirmRoles() {
                this.isShowRoles = false;
                console.log('父组件： ', this.$refs.roles.multipleSelection);
                updateUserRoles(this.selectUserId, this.$refs.roles.multipleSelection).then(res => {
                    this.$utils.messageTips(1000, '添加角色成功', 'success');
                    this.getAllUser();
                    this.$refs.roles.multipleSelection = [];
                    this.$refs.roles.roleList = [];
                }).catch(err => console.log(err))
            },
            cacelRoles() {
                this.isShowRoles = false;
                this.selectUserId = '';
                this.$refs.roles.multipleSelection = [];
                this.$refs.roles.roleList = [];
                this.$refs.roles.pageParam = {
                    pageNum: 1,
                    pageSize: 3,
                    pageTotal: 0
                };
            },
            // editUserInfoDialog = false
            // 删除用户
            deleteUserInfo(row) {
                this.$utils.confirmTips(row.username, '提示').then(() => {
                    deleteUserById(row.id).then(res => {
                        this.$utils.messageTips(1000, '删除用户成功', 'success');
                        if (this.pageParam.pageTotal != res.data) {
                            this.pageParam.pageTotal = res.data;
                        }
                        this.getAllUser();
                    }).catch(err => {
                        this.$utils.messageTips(1000, '删除用户失败', 'error')
                    })
                }).catch((err) => {
                    console.log(err)
                })
            },
            handleClick(id) {
                console.log(id);
            },
            pageChange(pageNum) {
                this.pageParam.pageNum = pageNum;
                this.getAllUser();
            },
            sizeChange(currentSize) {
                this.pageParam.pageSize = currentSize
                this.getAllUser()
            },
            // 分页查询用户
            getAllUser() {
                findAllUser(this.pageParam.pageNum, this.pageParam.pageSize).then(res => {
                    this.userTableData = res.data.list;
                    this.restaurants = this.userTableData.map((item) => {
                        return {"value": item.username};
                    });
                    this.pageParam.pageTotal = res.data.total;
                    this.$utils.messageTips(1000, '获取用户列表success', 'success');
                }).catch(err => {
                    this.$utils.messageTips(1000, '获取用户列表失败', 'error');
                })
            },
            addRoles(row) {
                this.selectUserId = row.id;
                this.isShowRoles = true;
                // 等待页面加载完成后调用,因为可能存在dialog未加载，先调用下列方法，导致报错：该方法未定义
                this.$nextTick(() => {
                    this.$refs.roles.findRolesByUserId();
                })

            },
        }
    }
</script>

<style scoped>
    #button-group {

    }

    #user-table {
        margin-top: 10px;
    }

    .inline-input {
        margin-left: 10px;
    }

    .el-button--mini {
        margin-left: 10px;
    }

    .upload-demo {
        float: left;
    }

    .el-input--small {
        width: 320px;
    }

    .add-user-class {
    }
</style>

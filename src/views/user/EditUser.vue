<template>
    <div>
        <!-- Form -->
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="userForm">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="userForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userForm.email" autocomplete="off"></el-input>
                </el-form-item>
                // 出生年月
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userForm: {
                    name: '',
                    password: '',
                    address: '',
                    email: ''
                },
                dialogFormVisible: false
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
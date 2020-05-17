<template>
    <div class="default-login-calss">
        <el-form ref="form" :model="form" label-width="80px" class="login-box">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthdate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"
                          :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {registry} from "../js/login";
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    birthdate: '',
                    email: '',
                    sex: 0,
                    phone: '',
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('registry: ',this.form);
                registry(this.form).then(res => {
                    console.log('registry: ',res);
                    this.$utils.messageTips(1000, '注册成功', 'success');
                    this.$router.push('/login');
                }).catch(err => console.log(err))
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .default-login-calss {
        background: url("../assets/login_background.jpg");
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }


    .login-box {
        /*border: 1px solid #DCDFE6;*/
        /*width: 350px;*/
        /*margin: 180px auto;*/
        /*padding: 35px 35px 15px 35px;*/
        /*border-radius: 5px;*/
        /*-webkit-border-radius: 5px;*/
        /*-moz-border-radius: 5px;*/
        /*box-shadow: 0 0 25px #909399;*/

        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login-title {
        /*text-align: center;*/
        /*margin: 0 auto 40px auto;*/
        /*color: #303133;*/
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>
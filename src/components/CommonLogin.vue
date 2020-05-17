<template>
    <div class="default-login-calss">
        <el-form label-position="left" label-width="80px"
                 class="login-box"
                 ref="loginInfo"
                 :model="loginInfo"
                 :rules="rules">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginInfo')" :disabled="isSubmit">提交</el-button>
                <el-button @click="resetForm('loginInfo')">重置</el-button>
                <el-button @click.native="registry">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from "../js/login";

    export default {
        data() {
            return {
                loginInfo: {
                    username: '',
                    password: '',
                    rememberMe: false
                },
                rules: {
                    username: [
                        {require: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {require: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
                // 错误登录次数
                loginErrNum: 0,
                // 是否禁用提交
                isSubmit: false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(this.loginInfo).then(res => {
                            console.log(res.data.token);
                            sessionStorage.setItem("Authorization", res.data.token);
                            this.$store.commit('setPermissions', res.data.params.permitSet);
                            this.$router.push('/');
                            console.log('user.menus', res.data.menus);
                            console.log('login==>Authorization: ', sessionStorage.getItem("Authorization"));
                            console.log('login==>setPermissions: ', res.data.params.permitSet);
                            console.log('login==>setRoles: ', res.data.params.roleSet);
                        }).catch(err => {
                            if (err.code === 607) {
                            }
                            console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            registry() {
              this.$router.push('/registry');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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
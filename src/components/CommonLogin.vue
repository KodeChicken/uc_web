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
                <el-button type="primary" @click="submitForm('loginInfo')">提交</el-button>
                <el-button @click="resetForm('loginInfo')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
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
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        axios.post('/pub/login', this.loginInfo)
                            .then(res => {
                                debugger
                                    console.log(res.data.data.sessionId)
                                    console.log('user.menus', res.data.data.menus)
                                    window.localStorage.setItem("token", res.data.data.sessionId)
                                    console.log('tokenItem: ', window.localStorage.getItem("token"))
                                    this.$router.push({name: 'index'});

                            }).catch(err => {
                                console.log(err)
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
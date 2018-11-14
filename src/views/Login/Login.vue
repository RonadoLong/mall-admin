<template>
    <div class="login">
        <div class="login-form">
            <div class="login-header">
                <img src="../../assets/images/logo.png" height="100" alt="">
                <p>{{ $Config.siteName }}</p>
            </div>
            <el-input
                    placeholder="请输入用户名"
                    suffix-icon="fa fa-user"
                    v-model="username"
                    style="margin-bottom: 18px"
            >
            </el-input>

            <el-input
                    placeholder="请输入密码"
                    suffix-icon="fa fa-keyboard-o"
                    v-model="password"
                    type="password"
                    style="margin-bottom: 18px"
                    @keyup.native.enter="login"
            >
            </el-input>

            <el-button
                    type="primary" :loading="loginLoading"
                    style="width: 100%;margin-bottom: 18px"
                    @click.native="login"
            >login
            </el-button>
            <div>
                <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
                <!--<a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>-->
            </div>

        </div>
    </div>
</template>

<script>
    import {login} from "~/api/login";
    import md5 from 'js-md5'

    export default {
        data() {
            return {
                username: '',
                password: '',
                Remenber: true,
                loginLoading: false
            }
        },
        methods: {
            login() {

                let APP = this;
                if (this.username === '' || this.password === '') {
                    APP.$notify({
                        title: 'Tip',
                        message: 'username or password not all null',
                        type: 'danger'
                    });
                    return
                }

                APP.loginLoading = true;
                let password = md5.hex(this.password)
                console.log(password)
                let data = {
                    password,
                    username: this.username
                }

                login(data).then(res => {
                    APP.loginLoading = false;
                    console.log(res)
                    if (res.code === 200) {
                        sessionStorage.setItem(APP.$Config.tokenKey, res.data.token);
                        APP.$notify({
                            title: 'Tip',
                            message: 'Login Success',
                            type: 'success'
                        });
                        APP.$router.push({path: '/'});
                    }
                })

            }
        }
    }
</script>

<style lang="less">
    @import "Login.less";
</style>
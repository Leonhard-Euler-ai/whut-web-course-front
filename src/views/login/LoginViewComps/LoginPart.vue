<template>
  <div class="login">
    <div class="login-title">
      <p>登录</p>
    </div>

    <el-form :model="loginForm" :rules="rules" class="login-form">
      <el-form-item prop="username" class="form-item-username">
        <el-input placeholder="用户名" clearable v-model="loginForm.username">
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password" class="form-item-password">
        <el-input placeholder="密码" show-password clearable v-model="loginForm.password"
                  @keyup.enter.native="login">
          <template #prefix>
            <img src="~assets/img/login-password.png" class="icon-password">
          </template>
        </el-input>
      </el-form-item>

      <el-form-item class="form-item-remember-password">
        <el-checkbox v-model="rememberPassword">
          <span>记住密码</span>
        </el-checkbox>
        <span class="forgottenPassword" @click="forgetPassword">忘记密码?</span>
      </el-form-item>

      <el-form-item>
        <el-button class="button-login" @click="login">登录</el-button>
      </el-form-item>

      <p class="user-register">
        还没有注册帐号？
        <span @click="registerUser">立即注册</span>
      </p>

      <div class="login-by-other-ways">
        <p class="other-login-title">使用第三方登录</p>
      </div>

      <div class="other-login-wrap">
        <img src="~assets/img/QQ.png" @click="loginByQQ">
        <img src="~assets/img/wechat.png" @click="loginByWeChat">
      </div>
    </el-form>
  </div>
</template>

<script>
import {requestLogin} from "network/api";

export default {
  name: "LoginView",
  data() {
    return {
      rememberPassword: true,
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在2到15个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在8到20个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      requestLogin(this.loginForm.username, this.loginForm.password).then(axiosRes=>{
        if (axiosRes.data.code === 200) {
          window.sessionStorage.setItem("authorization","success")
          this.$store.dispatch('setUserInfo', axiosRes.data.data)
          this.$router.push('/main')
          this.$message.success(axiosRes.data.message)
        }else{
          this.$message.error(axiosRes.data.message)
        }
      })
    },
    registerUser() {
      this.$router.push("/login/toRegister")
      this.$message.success("注册")
    },
    forgetPassword() {
      this.$message.success("忘记密码")
    },
    loginByQQ() {
      this.$message.success("QQ登录")
    },
    loginByWeChat() {
      this.$message.success("微信登录")
    }
  }
}
</script>

<style scoped>
@import "~assets/css/login-part.css";
</style>

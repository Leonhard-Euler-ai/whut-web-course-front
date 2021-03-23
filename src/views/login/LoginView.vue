<template>
  <div class="login-page">
    <el-card class="login-form-wrapper">
      <template #header>
        <span class="login-title">用户登录</span>
      </template>

      <el-form :model="loginForm" :rules="rules" :status-icon="true">

        <el-form-item prop="username">
          <el-input placeholder="用户名" clearable v-model="loginForm.username">
            <template #prefix>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" show-password clearable v-model="loginForm.password"
                    @keyup.enter.native="login">
            <template #prefix>
              <img src="~assets/login_password.png" class="icon-password">
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button-login" @click="login">登录</el-button>
        </el-form-item>

        <span class="user-register" @click="register">注册新用户</span>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import {requestLogin} from "network/api";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      window.sessionStorage.setItem("authorization", "success")
      let userInfo = {
        nickname: 'Leonhard Euler',
        mail: '873406454@qq.com',
        birthday: '2000-11-10',
        balance: '20000'
      };
      this.$store.dispatch('setUserInfo', userInfo)
      this.$router.push('/main')
      /*requestLogin(this.username, this.password).then(axiosRes=>{
        if (axiosRes.data.code === 200) {
           window.sessionStorage.setItem("authorization","success")
            this.$router.push('/main')
            this.$message.success(axiosRes.data.message)
        }else{
          this.$message.error(axiosRes.data.message)
        }
      })*/
    },
    register() {
      this.$message.success("注册新用户")
    }
  }
}
</script>

<style scoped>
.login-page {
  background-color: #E9EEF3;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.login-form-wrapper {
  margin: auto;
  position: absolute;
  top: 18%;
  left: 0;
  right: 0;
  width: 370px;
}

.login-title {
  position: absolute;
  left: 37%;
  line-height: 3px;
  font-size: 19px;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  letter-spacing: 10px;
  color: #409EFF;
}

.el-icon-user {
  margin-left: 5px;
  transform: scale(1.4)
}

.icon-password {
  margin-left: -11px;
}

.button-login {
  background-color: #53A8FF;
  color: #fff;
  width: 100%;
}

.user-register {
  font-size: 13px;
  color: #909399;
  cursor: pointer;
}
</style>

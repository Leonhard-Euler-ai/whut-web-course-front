<template>
  <div class="register">
    <div class="register-title">
      <p>注册</p>
    </div>

    <el-form :model="registerForm" :rules="rules" class="register-form">
      <el-form-item prop="username">
        <el-input placeholder="用户名" clearable v-model="registerForm.username">
          <template #prefix>
            <i class="el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="mobile">
        <el-input placeholder="手机号" clearable v-model.number="registerForm.mobile">
          <template #prefix>
            <i class="el-icon-phone"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password" class="form-item-password">
        <el-input placeholder="密码" show-password clearable v-model="registerForm.password"
                  @keyup.enter.native="register">
          <template #prefix>
            <img src="~assets/img/login-password.png" class="icon-password">
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword" class="form-item-password">
        <el-input placeholder="确认密码" show-password clearable v-model="registerForm.confirmPassword"
                  @keyup.enter.native="register">
          <template #prefix>
            <img src="~assets/img/login-password.png" class="icon-password">
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="verCode" class="form-item-username">
        <el-input placeholder="验证码" clearable v-model="registerForm.verCode">
          <template #append>
            <el-button :disabled="codeButtonDisabled" @click="sliderCallBack" id="TencentCaptchaBtn">
              {{ codeText }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="button-register" :disabled="registerDisabled" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {requestRegister, requestSendPhoneVerCode} from "network/api"

export default {
  name: "LoginView",
  data() {
    return {
      registerDisabled: true,
      registerForm: {
        username: "",
        mobile: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在2到15个字符', trigger: 'blur'}
        ],
        mobile: [
          {required: true, type: 'number', message: '请输入手机号', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              const pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
              if (!pattern.test(value)) {
                callback(new Error('请输入有效的手机号'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在8到20个字符', trigger: 'blur'}
        ],
        confirmPassword: [
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                this.registerDisabled = false;
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      codeText: "发送验证码",
      codeButtonDisabled: false
    }
  },
  methods: {
    sliderCallBack() {
      if (this.registerForm.mobile === "") {
        this.$message.warning("请输入手机号")
        return
      }
      const _this = this
      let captcha = new TencentCaptcha(document.getElementById('TencentCaptchaBtn'),
        "2014358573",
        function (res) {
          if (res.ret === 2) {
            alert("用户取消验证")
          } else if (res.ret === 0) {
            _this.sendPhoneVerCode();
          }
        });
      captcha.show();
    },
    codeTextChange() {
      this.codeButtonDisabled = true;
      let seconds = 60;
      const appendText = "s后重发";
      this.codeText = seconds + appendText;
      const _this = this
      let timer = setInterval(function () {
        if (seconds === 1) {
          _this.codeText = "发送验证码";
          _this.codeButtonDisabled = false;
          clearInterval(timer)
          return
        }
        seconds -= 1;
        _this.codeText = seconds + appendText;
      }, 1000)
    },

    sendPhoneVerCode() {
      requestSendPhoneVerCode(this.registerForm.mobile).then(axiosRes => {
        if (axiosRes.data.code === 200) {
          this.$message.success(axiosRes.data.message)
          this.codeTextChange()
        } else {
          this.$message.error(axiosRes.data.message)
        }
      })
    },

    register() {
      //发送网络请求
      requestRegister(this.registerForm.username, this.registerForm.mobile,
        this.registerForm.password, this.registerForm.verCode)
        .then(axiosRes => {
          if (axiosRes.data.code === 200) {
            this.$message.success(axiosRes.data.message)
            this.$router.push("/login")
          } else {
            this.$message.error(axiosRes.data.message)
          }
        })
    }
  }
}
</script>

<style scoped>
@import "~assets/css/register-view.css";
</style>

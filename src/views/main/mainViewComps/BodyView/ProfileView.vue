<template>
  <el-tabs class="profile-tab">

    <el-tab-pane label="个人资料">
      <el-form class="user-info-form">
        <el-form-item>
          <el-input :disabled="notEditable" v-model="userBaseInfo.nickname">
            <template #prepend>
              <div class="label-wrapper">
                <label>昵称</label>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input :disabled="notEditable" v-model="userBaseInfo.mail">
            <template #prepend>
              <div class="label-wrapper">
                <label>邮箱</label>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input :disabled="notEditable" v-model="userBaseInfo.birthday">
            <template #prepend>
              <div class="label-wrapper">
                <label>生日</label>
              </div>
            </template>
            <template #append>
              <el-date-picker
                :disabled="notEditable"
                class="data-picker"
                v-model="date" type="date"
                @change="dateChange"
                placeholder="请选择日期">
              </el-date-picker>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input disabled v-model="userBaseInfo.balance">
            <template #prepend>
              <div class="label-wrapper">
                <label>余额</label>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editButtonClick" class="edit-button">编辑</el-button>
          <el-button type="primary" @click="userInfoSubmitButtonClick">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="密码修改">
      <el-form :model="ruleForm" class="change-password-form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" clearable v-model="ruleForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="confirmNewPassword" label="确认新密码">
          <el-input type="password" clearable v-model="ruleForm.confirmNewPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePasswordSubmitButtonClick" class="submit-button"
                     :disabled="submitDisabled">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {formatDateToDateString} from 'utils/DateFormatUtil'
import {mapGetters} from 'vuex'

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  data() {
    return {
      notEditable: true,
      userBaseInfo: {
        nickname: '',
        mail: '',
        birthday: '',
        balance: ''
      },
      date: '',
      ruleForm: {
        newPassword: '',
        confirmNewPassword: ''
      },
      submitDisabled: true,
      rules: {
        newPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        confirmNewPassword: [
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                this.submitDisabled = false;
                this.callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.userBaseInfo.nickname = this.getUserInfo.nickname;
    this.userBaseInfo.mail = this.getUserInfo.mail;
    this.userBaseInfo.birthday = this.getUserInfo.birthday;
    this.userBaseInfo.balance = this.getUserInfo.balance;
  },
  methods: {
    dateChange() {
      this.userBaseInfo.birthday = formatDateToDateString(this.date);
    },
    editButtonClick() {
      this.notEditable = !this.notEditable;
    },
    userInfoSubmitButtonClick() {
      this.$message.success("提交" + this.userBaseInfo.nickname + "修改的基本信息");
    },
    changePasswordSubmitButtonClick() {
      this.$message.success("修改" + this.userBaseInfo.nickname + "的密码");
    }
  }
}
</script>

<style scoped>
.user-info-form {
  width: 580px;
}

.data-picker {
  margin-right: -20px;
}

.change-password-form {
  width: 580px;
  margin-top: 20px;
  margin-left: 90px;
}

.label-wrapper {
  width: 70px;
  text-align: center;
  font-size: 16px;
}

.edit-button {
  margin-left: 160px;
  margin-right: 110px;
}

.submit-button {
  margin-left: 200px;
}
</style>

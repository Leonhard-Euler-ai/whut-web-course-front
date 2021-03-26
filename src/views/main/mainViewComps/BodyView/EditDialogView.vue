<template>
  <el-dialog title="用户信息" :visible="isShowDialog" show-close width="400px">
    <el-form :model="userInfo">
      <el-form-item>
        <el-input disabled v-model="userInfo.name">
          <template #prepend>姓名</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userInfo.password" disabled>
          <template #prepend>密码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userInfo.mail">
          <template #prepend>邮箱</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userInfo.birthday">
          <template #prepend>生日</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userInfo.balance">
          <template #prepend>余额</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancelButtonClick">取 消</el-button>
      <el-button type="primary" @click="submitButtonClick">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "EditDialogView",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    originalFormData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    dialogFormVisible(newValue) {
      this.isShowDialog = newValue;
    },
    originalFormData(newValue) {
      this.userInfo = newValue;
    }
  },
  data() {
    return {
      isShowDialog: this.dialogFormVisible,
      userInfo: this.originalFormData
    }
  },
  methods: {
    cancelButtonClick() {
      this.$emit("cancel");
    },
    submitButtonClick() {
      this.$emit("submit", this.userInfo);
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="header">

    <div class="back-icon-wrapper">
      <i class="el-icon-d-arrow-left" @click="headerCompClick"></i>
    </div>

    <span class="header-title">后台管理系统</span>

    <div class="empty-area"></div>

    <div class="history-icon-wrapper">
      <i class="el-icon-pie-chart" @click="headerCompClick"></i>
    </div>

    <div class="link-icon-wrapper">
      <i class="el-icon-link" @click="headerCompClick"></i>
    </div>

    <div class="profile-photo-wrapper">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                 class="profile-photo">
      </el-avatar>
    </div>

    <div class="dropdown-wrapper">
      <el-dropdown @command="handleCommand">
        <span class="border-user-info">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="self-profile">我的档案</el-dropdown-item>
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderView",
  data() {
    return {
      username: this.$store.state.userInfo.nickname
    }
  },
  methods: {
    headerCompClick() {
      this.$message.info("HeaderCompClickEvent");
    },
    handleCommand(command) {
      this.$message.success(command);
      if (command === "logout") {
        window.sessionStorage.clear();
        this.$router.replace("/login");
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  height: 100%;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  color: #fff;
}

.back-icon-wrapper {
  width: 60px;
}

.el-icon-d-arrow-left {
  transform: scale(1.6);
  cursor: pointer;
}

.header-title {
  width: 200px;
  font-size: 18px;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  letter-spacing: 3px;
}

.empty-area {
  width: 785px;
}

.history-icon-wrapper {
  width: 70px;
}

.el-icon-pie-chart {
  transform: scale(1.3);
  cursor: pointer;
}

.link-icon-wrapper {
  width: 100px;
}

.el-icon-link {
  transform: scale(1.5);
  cursor: pointer;
}

.profile-photo-wrapper {
  width: 60px;
}

.profile-photo {
  vertical-align: middle;
  cursor: pointer;
}

.dropdown-wrapper {
  width: 80px;
  cursor: pointer;
}

.border-user-info{
  color: #fff;
}
</style>

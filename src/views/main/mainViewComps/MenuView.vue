<template>
  <el-menu
    :router="true"
    :uniqueOpened="true"
    class="entire-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="this.$route.path">

    <el-menu-item index="/main/home">
      <i class="el-icon-s-home"></i>
      <template #title>首页</template>
    </el-menu-item>

    <el-submenu index="2">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>功能模块</span>
      </template>
      <el-menu-item index="/main/profile" >个人中心</el-menu-item>
      <el-menu-item index="/main/user-management">用户管理</el-menu-item>
      <el-menu-item index="/main/article-management" >文章管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "MenuView",
}
</script>

<style scoped>

</style>

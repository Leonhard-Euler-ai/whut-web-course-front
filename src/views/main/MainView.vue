<template>
  <div class="main-page">
    <el-container>
      <el-header class="header-wrapper">
        <header-view/>
      </el-header>

      <el-container class="inner-container">
        <el-aside class="aside-wrapper" width="270px">
          <menu-view/>
        </el-aside>

        <el-container>
          <el-main class="body-wrapper">
            <router-view></router-view>
          </el-main>

          <el-footer class="footer-wrapper" height="30px">
            <footer-view/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderView from "views/main/mainViewComps/HeaderView";
import MenuView from "views/main/mainViewComps/MenuView";
import ProfileView from "views/main/mainViewComps/BodyView/ProfileView";
import FooterView from "views/main/mainViewComps/FooterView";

export default {
  name: "Main",
  components: {
    HeaderView,
    MenuView,
    ProfileView,
    FooterView
  }
}
</script>

<style scoped>
.main-page {
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
}

.header-wrapper {
  width: 100%;
  background-color: #373D41;
  padding: 0;
}

.inner-container {
  height: 564px;
}

.aside-wrapper {
  background-color: #515568;
}

.aside-wrapper > ul {
  border: 0;
}

.body-wrapper {
  background-color: #EBEEF5;
  padding-bottom: 0;
}

.footer-wrapper {
  background-color: #EEE;
  width: 100%;
  bottom: 0;
  padding: 0;
  text-align: center;
}
</style>

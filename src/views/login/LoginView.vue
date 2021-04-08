<template>
  <div class="login-page">
    <div class="login-wrap">
      <login-left-img class="img-wrap"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import LoginLeftImg from "@/views/login/LoginViewComps/LoginLeftImg";
import LoginPart from "@/views/login/LoginViewComps/LoginPart";

export default {
  name: "LoginView",
  components: {
    LoginLeftImg,
    LoginPart
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(45deg, #211136, #bf5853);
  height: 100vh;
}

.login-wrap {
  width: 980px;
  min-height: 500px;
  border-radius: 10px;
  font-family: "neo";
  overflow: hidden;
  box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 50%;
  right: 50%;
  margin-top: -250px;
  margin-right: -490px;
}

/* 自适应布局 */
@media screen and (max-width: 1000px ) {
  .img-wrap {
    display: none;
  }

  .login-wrap {
    width: 490px;
    margin-right: -245px;
  }

  .login, .register {
    width: 100%;
  }
}
</style>

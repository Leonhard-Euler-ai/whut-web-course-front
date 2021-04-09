<template>
  <div></div>
</template>

<script>
import {postOauthInfoOfGitHub} from "network/api";

export default {
  name: "LoginTransfer",
  data() {
    return {
      query: this.$route.query
    }
  },
  mounted() {
    console.log("mounted")
    const loading = this.$loading({
      lock: true,
      text: '登陆中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const _this = this
    setTimeout(function () {
      _this.saveInfo()
      loading.close()
    }, 2000)

  },
  methods: {
    saveInfo() {
      postOauthInfoOfGitHub(this.query).then(axiosRes => {
        if (axiosRes.data.code === 200) {
          window.sessionStorage.setItem("authorization", "success")
          this.$store.dispatch('setUserInfo', axiosRes.data.data)
          this.$router.push('/main')
          this.$message.success(axiosRes.data.message)
        } else {
          this.$message.error(axiosRes.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

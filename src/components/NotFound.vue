<template>
  <div class="tcy_404 container">
    <img src="~assets/img/404.png">
    <h2>抱歉，您访问的页面出错了</h2>
    <p>您可能输错了网址，或该网页已删除或不存在</p>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.tcy_404 {
  background: #fff;
  font-family: "Lantinghei SC", "Helvetica Neue", "Microsoft YaHei", "WenQuanYi Micro Hei", "Heiti SC", "Segoe UI", Arial, sans-serif;
  font-size: 12px;
  height: 609px;
  position: absolute;
  width: 1355px;
}

.tcy_404 img {
  display: block;
  margin: 100px auto auto;
}

.tcy_404 h2 {
  font-size: 32px;
  color: #333333;
  text-align: center;
  letter-spacing: 5px;
  padding-top: 33px;
  padding-bottom: 25px
}

.tcy_404 p {
  font-size: 14px;
  color: #666666;
  letter-spacing: 1px;
  text-align: center;
  padding-bottom: 35px
}
</style>

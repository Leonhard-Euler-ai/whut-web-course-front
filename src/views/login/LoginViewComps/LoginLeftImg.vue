<template>
  <div class="img-wrap">
    <span class="circle">
      <span v-for="index in 2" :key="index"></span>
    </span>
    <span class="star">
      <span v-for="index in 8" :key="index"></span>
    </span>
    <span class="fly-star">
      <span v-for="index in 2" :key="index"></span>
    </span>
    <p class="bottom-title">Web Course</p>
  </div>
</template>

<script>
export default {
  name: "LoginLeftImg"
}
</script>

<style scoped>
.img-wrap {
  width: 50%;
  min-height: 500px;
  background: linear-gradient(45deg, #221334, #6c3049);
  float: left;
  position: relative;
}

.img-wrap span {
  position: absolute;
  display: block;
}

/* 中心圆样式 */
.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, #df5555, #ef907a);
  top: 70px;
  left: 50%;
  margin-left: -100px;
  overflow: hidden;
}

.circle span {
  width: 150px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
}

.circle span:nth-child(1) {
  top: 30px;
  left: -38px;
  background: #c55c59;
}

 .circle span:nth-child(2) {
  bottom: 20px;
  right: -35px;
  background: #934555;
}

/* 八颗星样式 */
.star span {
  background: radial-gradient(#fff 10%, #fff 20%, rgba(72, 34, 64, 0));
  border-radius: 50%;
  box-shadow: 0 0 7px #fff;
}

.star span:nth-child(1) {
  width: 15px;
  height: 15px;
  top: 50px;
  left: 30px;
}

.star span:nth-child(2) {
  width: 10px;
  height: 10px;
  left: 360px;
  top: 80px;
}

.star span:nth-child(3) {
  width: 5px;
  height: 5px;
  top: 400px;
  left: 80px;
}

.star span:nth-child(4) {
  width: 8px;
  height: 8px;
  top: 240px;
  left: 60px;
}

.star span:nth-child(5) {
  width: 4px;
  height: 4px;
  top: 20px;
  left: 200px;
}

.star span:nth-child(6) {
  width: 4px;
  height: 4px;
  top: 460px;
  left: 410px;
}

.star span:nth-child(7) {
  width: 6px;
  height: 6px;
  top: 250px;
  left: 350px;
}

/* 流星样式 */
.fly-star span {
  width: 90px;
  height: 3px;
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
  background: -o-linear-gradient(left, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
  background: linear-gradient(to right, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
  transform: rotate(-45deg);
}

.fly-star span:nth-child(1) {
  top: 60px;
  left: 80px;
}

.fly-star span:nth-child(2) {
  top: 210px;
  left: 332px;
  opacity: 0.6;
}

/* 底部标题样式 */
.bottom-title {
  text-align: center;
  color: #af4b55;
  font-weight: 600;
  margin-top: 365px;
  font-size: 25px;
}
</style>

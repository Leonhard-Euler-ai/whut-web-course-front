<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="click">ui</el-button>
  </div>
</template>

<script>
export default {
  methods:{
    click(){
      this.$message.success("Hello")
    }
  }

}
</script>

<template>
<!-- 不可编辑标签列表-->
  <div v-if="!editable">
    <el-tag
      v-for="tag in tags"
      :key="tag"
      @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
  </div>
  <!-- 可编辑标签列表-->
  <div v-else>
    <el-tag
      v-for="tag in tags"
      :key="tag"
      closable
      @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
  </div>
</template>

<script>
export default {
  name: "EditableLabel",
  props: {
    tags: {
      type: Array,
      default() {
        return []
      }
    },
    editable:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      // 自定义标签满足要求(不含空格，不重复)
      if (inputValue && inputValue.indexOf(" ") === -1
        && this.tags.findIndex(tag => inputValue === tag) === -1) {
        this.tags.push(inputValue);
        this.inputVisible = false;
        this.inputValue = '';
        return
      }
      if (this.tags.findIndex(tag => inputValue === tag) !== -1) {
        this.$message.warning("标签重复")
      } else if (inputValue.indexOf(" ") !== -1) {
        this.$message.warning("标签中不能还有空格")
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}

.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  /*margin-left: 10px;*/
}
</style>

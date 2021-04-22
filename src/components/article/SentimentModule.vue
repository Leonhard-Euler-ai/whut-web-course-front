<template>
  <div id="editor">
    <mavon-editor
      ref="md"
      style="height: 100%"
      :ishljs="true"
      v-model="mdValue"


      :toolbars-flag="toolbarFlag"
      :subfield="subfield"
      :default-open="openView"
      :navigation="true"
      placeholder=" "

      @change="change"
      @imgAdd="imgAdd"
      @imgDel="imgDel">
    </mavon-editor>
  </div>
</template>

<script>


export default {
  name: "SentimentModule",
  props: {
    sentiments: {
      default() {
        return ''
      }
    },
    editable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch: {
    editable(newValue) {
        this.toolbarFlag = newValue //是否显示工具栏
        this.subfield = newValue //是否双屏展示
    }
  },
  data() {
    return {
      openView: 'preview', //默认展示预览区域
      toolbarFlag: false, //默认编辑器没有工具栏
      subfield: false, //默认单屏展示

      mdValue: this.sentiments,
      htmlValue: '',
      imgList: []
    };
  },
  methods: {
    change: function (val, render) {
      this.htmlValue = render
      this.$emit('sentimentsChange',this.mdValue)
    },
    imgAdd(filename, imgfile) {
      // 缓存图片信息（当前还是本地图片状态）
      this.imgList[filename] = imgfile;
      console.log("添加图片：" + this.imgList[filename]);
    },
    imgDel(filename) {
      delete this.imgList[filename];
      console.log("删除图片：" + this.imgList[filename]);
    }
  }
}
</script>

<style scoped>

</style>

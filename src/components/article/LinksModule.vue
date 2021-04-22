<template>
  <div class="links-wrapper">
    <div class="link" v-for="(link,index) in links">
      <el-link :href="link.linkSrc"
               :underline="false"
               :index="index"
               :link="link"
               type="primary">
        {{ index + 1 }}. {{ link.linkName }}
      </el-link>
      <!-- 删除链接按钮     -->
      <el-button type="danger"
                 icon="el-icon-delete"
                 circle size="mini"
                 v-if="editable"
                 @click="deleteLink(index)"></el-button>
    </div>

    <!-- 添加链接控件   -->
    <div class="link-option" v-if="editable">
      <el-input placeholder="请输入链接地址"
                class="inputWithLinkHref"
                v-model="newLink.href"
                size="small"
                v-if="newLinkVisualbe"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
        <template #prepend>
          <el-input placeholder="请输入链接名" class="input-linkName" v-model="newLink.name"></el-input>
        </template>
      </el-input>
      <el-button v-else size="small" @click="showInput" type="primary">+ 添加链接</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinksModule",
  props: {
    links: {
      type: Array,
      default() {
        return []
      }
    },
    editable: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      newLink: {
        name: '',
        href: ''
      },
      newLinkVisualbe: false
    }
  },
  methods: {
    showInput() {
      this.newLinkVisualbe = true
    },
    handleInputConfirm() {
      let linkName = this.newLink.name
      let linkHref = this.newLink.href
      if (linkName && linkHref) {
        this.links.push({linkName, linkHref})
      }
      this.newLink.name = ''
      this.newLink.href = ''
      this.newLinkVisualbe = false
    },
    deleteLink(index) {
      this.links.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.link {
  display: flex;
  margin-bottom: 10px;
}

.el-link {
  font-size: 17px;
}

.link button {
  margin-left: 10px;
  transform: scale(0.8);
}

.inputWithLinkHref {
  width: 500px;
}

.input-linkName {
  width: 150px;
}

/* 没起效 */
.inputWithLinkHref .el-input-group__prepend {
  background-color: #fff;
  padding: 0;
}
</style>

<template>
  <div class="article-wrapper">
    <div class="article-top">
      <el-input class="input-article-title" v-model="article.title" v-if="editable" suffix-icon="el-icon-edit"/>
      <span class="article-title" v-else>{{ this.article.title }}</span>
      <div>
        <el-button type="danger" size="small" @click="deleteArticle">删除</el-button>
        <el-button type="primary" size="small" @click="editOrSave">{{ buttonName }}</el-button>
      </div>
    </div>
    <el-divider class="divider-line"></el-divider>
    <sentiment-module :sentiments="article.sentiments" :editable="editable" @sentimentsChange="sentimentsChange"/>
    <el-divider class="divider-line"></el-divider>
    <editable-label :tags="article.tags" :editable="editable"/>
  </div>
</template>

<script>
import SentimentModule from "@/components/article/SentimentModule";
import LinksModule from "@/components/article/LinksModule";
import EditableLabel from "@/components/article/EditableLabel";

import {requestPostNewArticle, requestUpdateArticle} from "network/api";
import {mapGetters} from "vuex";

export default {
  name: "Article",
  components: {
    EditableLabel,
    LinksModule,
    SentimentModule
  },
  computed: {
    ...mapGetters(['getUsernameOfArticles'])
  },
  props: {
    article: {
      type: Object,
      default() {
        return {
          id: null,
          title: '文章标题',
          sentiments: "写点文字吧...",
          tags: ['Vue', 'SpringBoot', 'TypeScript']
        }
      }
    }
  },
  data() {
    return {
      editable: false,
      buttonName: '编辑'
    }
  },
  methods: {
    deleteArticle() {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteArticleSuccess', this.article.id)
      }).catch(err=>{})
    },
    editOrSave() {
      // 当前为编辑状态，按钮名为保存
      if (this.editable === true) {
        this.editable = !this.editable
        this.buttonName = "编辑"

        // 若id为空,则是编辑保存新建的文章
        if (this.article.id === null) {
          //发送网络请求保存新文章
          requestPostNewArticle(this.getUsernameOfArticles, this.article.title,
            this.article.sentiments, this.article.tags.join(",")).then(res => {
            if (res.data.code === 200) {
              this.article.id = res.data.data
              this.$emit('saveArticleSuccess', this.article)
              this.$message.success(res.data.message)
            }
          })

        } else {
          //编辑保存旧文章
          requestUpdateArticle(this.article.id, this.article.title, this.article.sentiments, this.article.tags.join(","))
            .then(res => {
              if (res.data.code === 200) {
                this.$emit('saveArticleSuccess', this.article)
                this.$message.success(res.data.message)
              }
            })
        }
      }
      // 当前状态为预览状态，按钮名为编辑
      else {
        this.editable = !this.editable
        this.buttonName = "保存"
      }
    },
    sentimentsChange(newMdValue) {
      this.article.sentiments = newMdValue
    }
  }
}
</script>

<style scoped>
.article-wrapper {
  border: 1px solid rgba(34, 36, 38, .2);
  border-radius: .4em;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, .2) 0 1px 8px 0px;
}

.divider-line {
  margin: 14px 0;
}

.article-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-article-title {
  width: 150px;
}

.article-title {
  font-weight: bold;
}

.article-title > .el-input__inner {
  border: none;
}

.article-wrapper p {
  font-weight: bold;
  margin: 15px 0;
}
</style>

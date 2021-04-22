<template>
  <div>
    <div class="article-list-header">
      <span>用户姓名: {{ usernameOfArticles }}</span>
      <el-button type="primary" size="mini" class="new-article-button" @click="newArticleClick">新建文章</el-button>
      <span class="article-tags">
      <el-badge :value="9" type="warning" class="tag">
        <el-button size="small">Vue</el-button>
      </el-badge>
      <el-badge :value="2" type="warning" class="tag">
        <el-button size="small">Springboot</el-button>
      </el-badge>
      <el-badge :value="5" type="warning" class="tag">
        <el-button size="small">Mybatis</el-button>
      </el-badge>
        </span>
    </div>
    <div class="article-list-wrapper">
      <Article class="article"
               v-if="newArticleVisuable"
               @deleteArticleSuccess="deleteArticleSuccess"
               @saveArticleSuccess="saveArticleSuccess"/>

      <Article class="article"
               v-for="(article,index) in articles"
               @deleteArticleSuccess="deleteArticleSuccess"
               @saveArticleSuccess="saveArticleSuccess"
               :key="index"
               :article="article"/>
    </div>
  </div>
</template>

<script>
import Article from "components/article/Article";
import {mapGetters} from "vuex";
import {requestDeleteArticle} from "network/api";

export default {
  name: "ArticleList",
  components: {
    Article
  },
  computed: {
    ...mapGetters(['getUsernameOfArticles', 'getArticles'])
  },
  created() {
    this.usernameOfArticles = this.getUsernameOfArticles;
    this.articles = this.getArticles;
  },
  data() {
    return {
      newArticleVisuable: false,
      usernameOfArticles: '',
      articles: [],
    }
  },
  methods: {
    deleteArticleSuccess(id) {
      if (id === null) {
        this.newArticleVisuable = false
        return
      }

      //发送网络请求删除文章
      requestDeleteArticle(id).then(res=>{
        if(res.data.code===200){
          for (let i = 0; i < this.articles.length; i++) {
            if (this.articles[i].id === id) {
              this.articles.splice(i, 1)
            }
          }
          this.$message.success(res.data.message)
        }
      })

      //更改store中的信息
      this.$store.commit("changeArticles", this.articles)
    },
    saveArticleSuccess(article) {
      let isNewArticle = true
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === article.id) {
          this.articles.splice(i, 1, article)
          isNewArticle = false
          console.log("旧文章更新")
        }
      }

      //若为新增文章
      if (isNewArticle) {
        this.articles.push(article)
        this.newArticleVisuable = false
      }
      //更改store中的信息

      this.$store.commit("changeArticles", this.articles)
    },
    newArticleClick() {
      this.newArticleVisuable = true
    }
  }
}
</script>

<style scoped>
.article-list-header {
  margin-left: 8%;
  width: 80%;
}

.article-list-header span {
  font-size: 16px;
}

.new-article-button {
  margin-left: 100px;
}

.article-tags {
  margin-left: 110px;
}

.tag {
  margin-left: 20px;

}

.tag .el-button {
  background-color: #409EFF;
  color: #fff;
}

.article-list-wrapper {
  margin-top: 15px;
  margin-left: 8%;
  width: 83%;
}

.article {
  margin-bottom: 50px;
}
</style>

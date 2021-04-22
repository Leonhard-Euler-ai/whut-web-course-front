<template>
  <div>
    <span>文章管理</span>
    <el-divider></el-divider>
    <el-table
      ref="articleTable"
      class="articleTable"
      :data="articleTableData"
      border stripe
      height="445"
      :highlight-current-row="true"
      :show-summary="true"
      :summary-method="summary"
      :header-cell-style="{'text-align':'center'}"
      align="center">

      <el-table-column type="index" label="序号" width="50" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="学生id" width="100" align="center"></el-table-column>
      <el-table-column prop="username" label="学生姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="articleCount" label="文章数量" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="147" align="center">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleManageArticle(scope.$index,scope.row)">管理文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="echarts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

import {requestGetArticleStatisticalInfo, requestGetArticles} from "network/api";

export default {
  name: "ArticleManagementView",
  data() {
    return {
      searchContent: '',
      editRowIndex: '',
      //表中数据
      articleTableData: [],
      xdata: [],
      seriesValues: []
    }
  },
  created() {
    requestGetArticleStatisticalInfo().then(axiosRes => {
      if (axiosRes.data.code === 200) {
        this.articleTableData = axiosRes.data.data
        for (let i = 0; i < this.articleTableData.length; i++) {
          this.xdata.push(this.articleTableData[i].username)
          this.seriesValues.push(this.articleTableData[i].articleCount)
        }
        this.drawEcharts()
      }
    })
  },
  mounted() {

  },
  methods: {
    drawEcharts() {
      let myChart = echarts.init(document.getElementById('echarts'));
      myChart.setOption({
        title: {text: '用户文章统计'},
        tooltip: {},
        xAxis: {
          name: "姓名",
          data: this.xdata
        },
        yAxis: {
          type: 'value',
          name: '篇数',
        },
        series: [{
          name: '文章数量',
          type: 'bar',
          data: this.seriesValues
        }]
      });
    },
    search() {
      for (let i = 0; i < this.articleTableData.length; i++) {
        // 模糊匹配
        if (this.articleTableData[i].username.indexOf(this.searchContent) !== -1) {
          // 参数为行的obj对象,而不是索引
          this.$refs.articleTable.setCurrentRow(this.articleTableData[i]);
          return;
        }
      }
      this.$message.warning("不存在该学生")
    },
    summary() {
      const sums = []
      sums[0] = '合计'
      sums[1] = this.articleTableData.length + "人"
      sums[2] = 'N/A'
      let counts = 0
      for (let item of this.articleTableData) {
        counts += item.articleCount
      }
      sums[3] = counts + "篇"
      return sums
    },
    handleManageArticle(rowIndex, rowData) {
      // 发送网络请求获取用户id为id的所有文章数据
      //成功后再router.push,成功时后端返回的数据保存在store中,进入ArticleList时从store获取用户文章
      requestGetArticles(rowData.id).then(axiosRes => {
        if (axiosRes.data.code === 200) {
          this.$store.dispatch('setUsernameOfArticles', rowData.username)
          this.$store.dispatch('setArticles', axiosRes.data.data)
          this.$router.push("/main/articles")
        }
      })
    }

  }
}
</script>

<style scoped>
.el-divider {
  margin-top: 12px;
  margin-bottom: 10px;
  height: 2px;
}

.search-input {
  width: 250px;
}

.articleTable {
  width: 500px;
}

#echarts {
  width: 540px;
  height: 460px;
  margin-top: -440px;
  margin-left: 520px;
}
</style>

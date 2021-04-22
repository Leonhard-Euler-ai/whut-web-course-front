<template>
  <div>
    <span>用户信息管理</span>
    <el-divider></el-divider>
    <el-input placeholder="请输入学生姓名搜索" v-model="searchContent"
              class="search-input"
              @keyup.enter.native="search">
      <template #append>
        <el-button icon="el-icon-search" @click="search" style="background-color: #2189EA;color: #fff"></el-button>
      </template>
    </el-input>
    <el-divider></el-divider>

    <el-table
      ref="table"
      :data="tableData"
      border stripe
      height="400"
      :highlight-current-row="true"
      :header-cell-style="{'text-align':'center'}"
      align="center">

      <el-table-column type="index" label="序号" width="50" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="学生姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="password" label="学生密码" width="180" align="center"></el-table-column>
      <el-table-column prop="mail" label="邮箱" width="220" align="center"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="170" align="center"></el-table-column>
      <el-table-column prop="balance" label="余额" width="150" align="center"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger"
                     @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-dialog-view :dialog-form-visible="dialogFormVisible" :original-form-data="editForm"
                      @cancel="cancelEditForm"
                      @submit="changeUserInfo"/>
  </div>
</template>

<script>
import EditDialogView from "views/main/mainViewComps/BodyView/EditDialogView";

import {requestGetAllUsers,requestDeleteUser,requestUpdateUserInfo} from "network/api";

export default {
  name: "ManagementView",
  components: {
    EditDialogView
  },
  data() {
    return {
      searchContent: '',

      // 修改信息前后保存的数据
      dialogFormVisible: false,
      editForm: {
        name: '',
        password: '',
        mail: '',
        birthday: '',
        balance: ''
      },
      newUserInfo: {
        name: '',
        password: '',
        mail: '',
        birthday: '',
        balance: ''
      },
      editRowIndex: '',

      //表中数据
      tableData: []
    }
  },
  created() {
    requestGetAllUsers().then(axiosRes => {
      if (axiosRes.data.code === 200) {
        this.tableData = axiosRes.data.data
      }
    })
  },
  methods: {
    search() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name.indexOf(this.searchContent) !== -1) {
          // 参数为行的obj对象,而不是索引
          this.$refs.table.setCurrentRow(this.tableData[i]);
          return;
        }
      }
      this.$message.warning("不存在该学生")
    },
    handleEdit(rowIndex, rowData) {
      this.editForm.name = rowData.name;
      this.editForm.password = rowData.password;
      this.editForm.mail = rowData.mail;
      this.editForm.birthday = rowData.birthday;
      this.editForm.balance = rowData.balance;

      //记录当前编辑的行的索引
      this.editRowIndex = rowIndex;

      this.dialogFormVisible = true;
    },
    handleDelete(rowIndex, rowData) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 网络请求
        requestDeleteUser(rowData.name).then(axiosRes=>{
          if (axiosRes.data.code === 200) {
            this.tableData.splice(rowIndex, 1)
            this.$message.success('删除成功!');
          }
        })
      }).catch(() => {});
    },
    changeUserInfo(userInfo) {
      //记录编辑后的数据
      this.newUserInfo.name = userInfo.name;
      this.newUserInfo.password = userInfo.password;
      this.newUserInfo.mail = userInfo.mail;
      this.newUserInfo.birthday = userInfo.birthday;
      this.newUserInfo.balance = userInfo.balance;
      this.dialogFormVisible = false;

      //发送网络请求后台修改
      requestUpdateUserInfo(this.newUserInfo).then(axiosRes=>{
        if (axiosRes.data.code === 200) {
          this.tableData.splice(this.editRowIndex, 1, JSON.parse(JSON.stringify(this.newUserInfo)))
          this.$message.success('更新成功!');
        }
      })
    },
    cancelEditForm() {
      this.dialogFormVisible = false;
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
</style>

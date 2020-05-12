<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="adminUserList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminUserList: []
    }
  },
  created() {
    this.getAdminUserList()
  },
  methods: {
    async getAdminUserList() {
      const res = await this.$http.get('/rest/admin_users')
      this.adminUserList = res.data
    },
    del(row) {
      this.$confirm(`是否确定删除管理员 "${row.username}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/admin_users/${row._id}`)
          this.getAdminUserList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="categoryList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const res = await this.$http.get('/categories')
      this.categoryList = res.data
    },
    del(id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then( async () => {
          await this.$http.delete(`/categories/${id}`)
          this.getCategoryList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>

<style scoped>
</style>
<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="articleList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="所属分类" prop="categories"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
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
      articleList: []
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const res = await this.$http.get('/rest/articles')
      this.articleList = res.data
    },
    del(row) {
      this.$confirm(`是否确定删除文章 "${row.title}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/articles/${row._id}`)
          this.getArticleList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
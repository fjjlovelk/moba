<template>
  <div>
    <h1>广告列表</h1>
    <el-table :data="adList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="广告名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
      adList: []
    }
  },
  created() {
    this.getAdList()
  },
  methods: {
    async getAdList() {
      const res = await this.$http.get('/rest/ads')
      this.adList = res.data
    },
    del(row) {
      this.$confirm(`是否确定删除广告 "${row.name}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/ads/${row._id}`)
          this.getAdList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
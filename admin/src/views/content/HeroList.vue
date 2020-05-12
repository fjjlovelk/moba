<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heroList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="称号" prop="title"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="scope">
          <img :src="scope.row.avatar" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
      heroList: []
    }
  },
  created() {
    this.getHeroList()
  },
  methods: {
    async getHeroList() {
      const res = await this.$http.get('/rest/heroes')
      this.heroList = res.data
    },
    del(row) {
      this.$confirm(`是否确定删除英雄 "${row.name}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/heroes/${row._id}`)
          this.getHeroList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
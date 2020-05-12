<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="itemList" border>
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="物品名称" prop="name"></el-table-column>
      <el-table-column label="图标">
        <template v-slot="scope">
          <img :src="scope.row.icon" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
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
      itemList: []
    }
  },
  created() {
    this.getItemList()
  },
  methods: {
    async getItemList() {
      const res = await this.$http.get('/rest/items')
      this.itemList = res.data
    },
    del(row) {
      this.$confirm(`是否确定删除物品 "${row.name}" ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/items/${row._id}`)
          this.getItemList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
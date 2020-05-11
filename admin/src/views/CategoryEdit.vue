<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}分类</h1>
    <el-form :model="model" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    }
  },
  created(){
    this.id && this.getCategory()
  },
  methods: {
    async submit() {
      await this.$http.post('/categories', this.model)
      this.$router.push('/categories/list')
      this.$message.success('添加分类成功')
    },
    async getCategory(){
      const res = await this.$http.get(`/categories/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style scoped>
</style>
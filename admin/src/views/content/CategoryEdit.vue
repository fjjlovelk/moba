<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}分类</h1>
    <el-form :model="model" label-width="100px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parentOptions"
            :value="item._id"
            :label="item.name"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
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
      model: {
        name: '',
        parent: ''
      },
      parentOptions: []
    }
  },
  created() {
    this.getCategoryList()
    this.id && this.getCategory()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/categories/${this.id}`, this.model)
        this.$message.success('修改分类成功')
      } else {
        await this.$http.post('/rest/categories', this.model)
        this.$message.success('添加分类成功')
      }
      this.$router.push('/categories/list')
    },
    async getCategory() {
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data
    },
    async getCategoryList() {
      const res = await this.$http.get('/rest/categories')
      for (let i in res.data) {
        if (res.data[i].parent) {
          res.data.splice(i, 1)
        }
      }
      this.parentOptions = res.data
    }
  }
}
</script>

<style scoped>
</style>
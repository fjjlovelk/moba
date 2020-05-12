<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}管理员</h1>
    <el-form :model="model" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" show-password v-model="model.password"></el-input>
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
        username: '',
        password: ''
      }
    }
  },
  created() {
    this.id && this.getAdminUser()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
        this.$message.success('修改管理员成功')
      } else {
        await this.$http.post('/rest/admin_users', this.model)
        this.$message.success('添加管理员成功')
      }
      this.$router.push('/admin_users/list')
    },
    async getAdminUser() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    }
  }
}
</script>
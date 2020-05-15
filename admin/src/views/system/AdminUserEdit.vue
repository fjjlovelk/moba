<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}管理员</h1>
    <el-form :model="model" ref="adminRef" :rules="adminRule" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
      },
      adminRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 1,
            max: 7,
            message: '用户名长度在 1 到 7 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 4,
            max: 8,
            message: '密码长度在 4 到 8 个字符',
            trigger: 'blur'
          }
        ]
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
        this.$router.push('/admin_users/list')
      } else {
        this.$refs.adminRef.validate(async valid => {
          if (valid) {
            await this.$http.post('/rest/admin_users', this.model)
            this.$message.success('添加管理员成功')
             this.$router.push('/admin_users/list')
          } else {
            return false
          }
        })
      }
    },
    async getAdminUser() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    }
  }
}
</script>
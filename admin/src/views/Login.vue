<template>
  <div>
    <el-card header="登录">
      <el-form :model="model" ref="model" :rules="modelRule">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="logon">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      modelRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名长度在 1 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 8, message: '密码长度在 4 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.model)
      sessionStorage.setItem('token', res.data.token)
      this.$router.push('/')
      this.$message.success('登陆成功')
    },
    logon() {
      this.$refs.model.validate(async valid =>{
        if(valid){
          await this.$http.post('/logon', this.model)
          this.login()
        }else{
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 40rem;
  margin: 15rem auto;
}
</style>
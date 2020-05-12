<template>
  <div>
    <el-card header="登录">
      <el-form :model="model">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods:{
    login(){
      console.log(this.model)
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
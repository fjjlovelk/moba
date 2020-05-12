<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}文章</h1>
    <el-form :model="model" label-width="100px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :value="item._id"
            :label="item.name"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        title: '',
        categories: ''
      },
      categories: []
    }
  },
  created() {
    this.getCategoryList()
    this.id && this.getArticle()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/articles/${this.id}`, this.model)
        this.$message.success('修改文章成功')
      } else {
        await this.$http.post('/rest/articles', this.model)
        this.$message.success('添加文章成功')
      }
      this.$router.push('/articles/list')
    },
    async getArticle() {
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    async getCategoryList() {
      const res = await this.$http.get('/rest/categories')
      this.categories = res.data
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('/upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    }
  }
}
</script>
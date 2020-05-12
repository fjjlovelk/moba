<template>
  <div>
    <h1>{{ id ? '编辑':'新建' }}广告位</h1>
    <el-form :model="model" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" icon="el-icon-plus" @click="addAd">添加广告</el-button>
        <el-row type="flex" class="skill-row">
          <el-col v-for="(item, index) in model.items" :key="index" :lg="10" :xl="10">
            <el-form-item label="链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthorization()"
                :show-file-list="false"
                :on-success="res => item.image = res.url"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="danger" @click="model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: []
      }
    }
  },
  created() {
    this.id && this.getAd()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model)
        this.$message.success('修改广告位成功')
      } else {
        await this.$http.post('/rest/ads', this.model)
        this.$message.success('添加广告位成功')
      }
      this.$router.push('/ads/list')
    },
    async getAd() {
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      this.model = res.data
    },
    addAd() {
      let ad = {
        url: '',
        image: ''
      }
      this.model.items.push(ad)
    }
  }
}
</script>
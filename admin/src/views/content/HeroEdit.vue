<template>
  <div>
    <el-row>
      <el-col :span="12">
        <h1>{{ id ? '编辑':'新建' }}英雄</h1>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-button type="primary" @click="save">保存</el-button>
      </el-col>
    </el-row>
    <el-form :model="model" label-width="100px">
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthorization()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="10" show-score v-model="model.scores.difficulty"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="10" show-score v-model="model.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="10" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="10" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.useageTip" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTip" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTip" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button type="primary" icon="el-icon-plus" @click="addSkill">添加技能</el-button>
          <el-row type="flex" class="skill-row">
            <el-col v-for="(item, index) in model.skills" :key="index" :lg="10" :xl="10">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthorization()"
                  :show-file-list="false"
                  :on-success="res => item.icon = res.url"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="小技巧">
                <el-input v-model="item.tip" type="textarea" :rows="3"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
      categories: [],
      items: [],
      model: {
        name: '',
        avatar: '',
        title: '',
        categories: [],
        scores: {
          difficulty: 0,
          skill: 0,
          attack: 0,
          survive: 0
        },
        skills: [],
        items1: [],
        items2: [],
        useageTip: '',
        battleTip: '',
        teamTip: '',
        partners: []
      }
    }
  },
  created() {
    this.getCategories()
    this.getItems()
    this.id && this.getHero()
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url
    },
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/heroes/${this.id}`, this.model)
        this.$message.success('修改英雄成功')
      } else {
        await this.$http.post('/rest/heroes', this.model)
        this.$message.success('添加英雄成功')
      }
      this.$router.push('/heroes/list')
    },
    async getHero() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = res.data
    },
    async getCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    },
    async getItems() {
      const res = await this.$http.get(`/rest/items`)
      this.items = res.data
    },
    addSkill() {
      let skill = {
        name: '',
        icon: '',
        description: '',
        tip: ''
      }
      this.model.skills.push(skill)
    }
  }
}
</script>
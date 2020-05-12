const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  // 名称、头像、称号、类型、评分、技能、顺风出装、逆风出装、使用技巧、对抗技巧、团战思路、搭档
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficulty: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    name: { type: String },
    icon: { type: String },
    description: { type: String },
    tip: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  useageTip: { type: String },
  battleTip: { type: String },
  teamTip: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)
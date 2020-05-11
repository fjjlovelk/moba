module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  // 新增分类
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 获取分类列表
  router.get('/categories', async (req, res) => {
    const list = await Category.find().limit(10)
    res.send(list)
  })
  // 根据分类id获取分类
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({ status: 'ok' })
  })

  app.use('/admin/api', router)
}
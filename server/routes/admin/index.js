module.exports = app => {
  const express = require('express')
  const router = express.Router(
    { mergeParams: true }
  )

  // 新增分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取分类列表
  router.get('/', async (req, res) => {
    let queryOption = {}
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    } 
    const list = await req.Model.find().setOptions(queryOption).limit(10)
    res.send(list)
  })
  // 根据分类id获取分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 根据分类id修改分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ status: 'ok' })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), (req, res) => {
    req.file.url = `http://localhost:3000/uploads/${req.file.filename}`
    res.send(req.file)
  })
}
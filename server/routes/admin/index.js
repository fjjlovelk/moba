module.exports = app => {
  const express = require('express')
  const router = express.Router({ mergeParams: true })
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  // 新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 获取列表
  router.get('/', async (req, res) => {
    let queryOption = {}
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const list = await req.Model.find().setOptions(queryOption).limit(10)
    res.send(list)
  })
  // 根据id获取列表
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 根据id修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ status: 'ok' })
  })

  // 设置通用CRUD接口
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {
    req.file.url = `http://localhost:3000/uploads/${req.file.filename}`
    res.send(req.file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 验证用户名
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户名不存在')
    // 验证密码
    const isvalid = require('bcrypt').compareSync(password, user.password)
    assert(isvalid, 422, '密码错误')
    // 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message
    })
  })
}
module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost/moba', { useNewUrlParser: true, useUnifiedTopology: true })
}
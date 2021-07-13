const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  'name': String, //  用户名
  'tel': String, //  手机号码
  'address': String, //  公司地址
  'email': String, //  电子邮件
  'pwd': String, //  密码
  'userInfo': Object, //  用户信息
  'cart': Array, // 用户购物车
  'order': Array, // 用户订单
  'address': Array, // 用户地址
  'role': String, //  角色权限
})
module.exports = mongoose.model('users', usersSchema)
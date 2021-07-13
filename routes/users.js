const router = require('koa-router')()
const mongoose = require('mongoose')
const items = require('../models/users')
const utils = require('../public/javascript/utils')
router.prefix('/users')
utils.connectDB(mongoose)
//  用户接口页面


router.post('/login', async (ctx, next) =>{ //  登录 注册接口
  console.log(ctx.request.body)
  let para = {
    'name': ctx.request.body.name,
    'pwd': ctx.request.body.pwd,
  }
  //  查询是否存在角色名
  let res = await items.find(para)

  //  如果存在就返回当前用户信息
  if (res.length) { 
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
      data: res
    }
  //  如果不存在则进行注册
  } else {
    para.role = 1
    await items.create(para)
    res = await items.find(para)
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
      data: res
    }
  }
})



// router.post('/login', async (ctx, next) =>{ //  登录
//   console.log(ctx.request.body)
//   let para = {
//     'name': ctx.request.body.name,
//     'pwd': ctx.request.body.pwd
//   }
//   let res = await items.find(para)
//   console.log(res)
//   if (res.length) {
//     if (res[0].role !== 0) {
//       ctx.response.body = {
//         code: 1002,
//         msg: '无权限登录',
//         // data: res
//       }
//     } else {
//       ctx.response.body = {
//         code: 200,
//         msg: '操作成功',
//         data: res
//       }
//     }
//   } else {
//     ctx.response.body = {
//       code: 1001,
//       msg: '账号密码错误',
//       data: res
//     }
//   }
// })






router.post('/delete', async (ctx, next) => { //  删除
  let where = {'_id': ctx.request.body._id}
  
  let res  = await items.remove(where)
  utils.tips(ctx, res)
})
module.exports = router

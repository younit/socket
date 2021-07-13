module.exports = {
  connectDB (mongoose) {
    return mongoose.connect('mongodb://wind:wind@42.192.82.88:27017/wind', { useNewUrlParser:true, useUnifiedTopology: true })
  },
  /**
   * @method 查询列表 
   * @param { String } 上下文 
   * @param { String } 返回结果 
   */
  sls (ctx, res, total) {
    if (res) {
      return ctx.response.body = {
         code: 200,
         msg: '操作成功',
         data: res,
         total:total
       }
     } else {
       return  ctx.response.body = {
         code: 1001,
         msg: '操作失败',
         data: res
       }
     }
  },
  /**
   * 
   * @param { String } ctx 
   * @param { String } res 
   */
  tips (ctx, res) {
    if (res) {
     return ctx.response.body = {
        code: 200,
        msg: '操作成功',
        data: res
      }
    } else {
      return  ctx.response.body = {
        code: 1001,
        msg: '操作失败',
        data: res
      }
    }
  }
}
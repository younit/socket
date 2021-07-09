const router = require('koa-router')()
const socket= require('socket.io')
const io = socket()
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
  io.on('connection', client => {
 
    //  传递给客户端的数据
    client.emit('serve', '我是从服务端来的数据')
 
   
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

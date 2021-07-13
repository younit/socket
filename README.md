# socket
##  基于 `node.js` + `koa2` + `socket.io` 实现的即时通讯功能

###  该项目 主要技术概括

## 前端

#### `vue` + `axios` + `socket`

## 后端

#### `node` + `koa2` + `socket.io` + `mongoose`


## 数据库

#### `MongoDB`

## 服务端socket实现代码

```js
const io = socket(server);

 //监听socket连接
 io.on('connection', client => {

   //  接收客户端的数据--data
   client.on('client', (data) => {
     console.log('接收客户端的数据:', data)
     //  向客户端发送数据--data
     client.broadcast.emit('serve', data)
   })
 })
```

## 前端socket`部分`实现代码

```js
var socket = io() 
//  向服务端发送数据--content
socket.emit('client', content)

//  接收服务端发送过来的数据
socket.on('serve', (content) => {
  console.log(content)
  this.users.push(content)
})

```


new Vue({ 
  el: '#demo',
  data () {
    return {
      user: {
        id: '1',
        name: "帅气男孩"
      },
      users:[
        {
          id: '1',
          name: '帅气男孩',
          msg: '你好, 我是帅气男孩',
          sendTime: 1625819622257,
        },
        {
          id: '2',
          name: '美丽女孩',
          msg: '你好, 我是美丽女孩',
          sendTime: 1625819622257,
        },
      ],
      val: ''
    }
  },
  render (h) {
    var self = this
    return h('div', {
      'class': {
        content: true,
      }
    }, [
      h('ul', {
        'class': {
          users: true
        }
      }, [
        h('li', {
          'class': {
            toptar: true,
          },
        }, '消息'),
        h('li', {
          class: {
            ctx: true
          }
        }, 
         [
           h('ul', [
            this.users.map(item => {
              if (item.id === this.user.id) {
                return h('li', {
                  class: {
                    text_right: true,
                  }
                }, [
                  h('span', {
                    class: {
                      msg: true,
                      mgr5: true,
                      mbgd: true,
                    }
                  }, item.msg),
                  h('span', {
                    class: {
                      mglr5: true,
                    }
                  }, ':'),
                  h('span', {
                    class: {
                      username: true,
                    }
                  }, item.name)
                ])
              } else {
                return h('li', {
                  class: {
                    text_left: true,
                  }
                }, [
                  h('span', {
                    class: {
                      username: true,
                    }
                  }, item.name),
                  h('span', {
                    class: {
                      mglr5: true,
                    }
                  }, ':'),
                  h('span', {
                    class: {
                      msg: true,
                      mgl5: true,
                      mbgf: true,
                    }
                  }, item.msg),
                ])
              }

              
            })
           ])
         ]
        ),
        
        h('li', {
          class: {
            ftBox: true
          }
        }, [
          h('input', {
            domProps: {
              value: self.value
            },
            class: {
              minput: true
            },
            on: {
              input: (event) => {
                this.val = event.target.value
              }
            }
          }),
          h('button', {
            class: {
              mbtn: true
            },
            on: {
              click: () => {
                this.socketMsg(this.val)
              }
            }
          }, '发送')
        ]),
      ])
    ])
  },
  methods: {
    // hanldeClick(item) {
    //   console.log(item)
    // }
    socketMsg (msg) {
      var socket = io()  
      socket.emit('client', msg)
    }
  },
  created() {

    //  将数据发送给服务端
    // socket.emit('client', 'clientData')
  },
  mounted() {
    
  },
})
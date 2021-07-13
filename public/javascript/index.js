new Vue({ 
  el: '#demo',
  
  data () {
    return {
      user: {
        id: '1',
        name: "帅气男孩"
      },
      regInfo: {
        name: null,
        pwd: null,
      },
      users:[
        // {
        //   id: '1',
        //   name: '帅气男孩',
        //   msg: '你好, 我是帅气男孩',
        //   sendTime: 1625819622257,
        // },
        // {
        //   id: '2',
        //   name: '美丽女孩',
        //   msg: '你好, 我是美丽女孩',
        //   sendTime: 1625819622257,
        // },
      ],
      val: '', //  输入框的值
      talkRoom: false,
    }
  },
  render (h) {
    var self = this
    if (this.talkRoom === false) {
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
            },
              [
                h('span', {}, '登录注册'),
              ]
            ),

            h('li', {
              style: {
                'margin-top': '55%'
              }
            }, [
              h('ul', {
                style: {
                  'line-height': '50px',
                  'padding': '0 40px',
                }
              }, [
                h('li', {}, [
                  h('span', {
                    style: {
                      width: '100px',
                      display: 'inline-block',
                    }
                  }, '用户名/昵称'),
                  h('input', {
                    style: {
                      height: '30px',
                      textIndent: '10px',
                      fontSize: '18px'
                    },
                    domProps: {
                      value: self.value
                    },
                    on: {
                      input: e => this.regInfo.name = e.target.value,
                      keyup: e => {
                        if (e.keyCode === 13) {
                          this.reg_login()
                        }
                      }
                    }
                  }, ),
                ]),
                // h('li', {}, [
                //   h('span', {
                //     style: {
                //       width: '100px',
                //       display: 'inline-block',
                //     }
                //   }, '密码'),
                //   h('input', {
                //     style: {
                //       height: '30px',
                //       textIndent: '10px',
                //       fontSize: '18px'
                //     },
                //     domProps: {
                //       value: self.value
                //     },
                //     on: {
                //       input: e => this.regInfo.pwd = e.target.value,
                //       keyup: e => {
                //         if (e.keyCode === 13) {
                //           console.log(111)
                //         }
                //       }
                //     }
                //   }, ),
                // ]),
                h('li', {}, [
                  h('button', {
                    style: {
                      width: '100%',
                      height: '40px',
                      lineHeight: '40px',
                      marginTop: '20px',
                      backgroundColor: '#ff6600',
                      border: '0',
                      borderRadius: '5px',
                      color: '#fff',
                      fontSize: '16px',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        this.reg_login()
                      },
                     
                    }
                  }, '登录/注册'),
                ]),
              ])
            ])
          ]
        )
      ])
    } else {
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
          }, [
            h('span', {
              style: {
                float: 'left',
                padding: '0 15px',
              },
              on: {
                click: () => {
                  this.talkRoom = false
                }
              }
            }, '<'),
            h('span', {}, '消息'),
          ]),
          h('li', {
            class: {
              ctx: true
            }
          }, 
          [
            h('ul', {
              style: {
                'overflow-y': 'scroll',
                'height': '680px'
              }
            },[
              this.users.map(item => {
                if (item.name === this.user.name) {
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
                  if (item.name) {
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
                },
                keyup: e => {
                  if (e.keyCode === 13) {
                    this.socketMsg(this.val)
                  }
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
    }
  },
  methods: {
    reg_login () {
      var self = this
      if (this.regInfo.name === null) {
        alert("昵称不能为空")
      } else {
        axios.post('/users/login', {
          name: self.regInfo.name,
          pwd: self.regInfo.pwd
        })
        .then(function (response) {
          let { code, msg, data } = response.data
          if (code === 200) {
            alert(msg)
            self.talkRoom = true
            self.user = data[0]
            console.log(self.user)
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    },
    
    socketMsg (msg) {
      var socket = io() 
      let content = {
        name: this.user.name,
        msg: msg,
        sendTime: new Date()
      }
      socket.emit('client', content)
      
      
    },
  },
  created() {
    
    //  将数据发送给服务端
    // socket.emit('client', 'clientData')
  },
  mounted() {
    var socket = io()
    socket.on('serve', (content) => {
      console.log(content)
      this.users.push(content)
    })
  },
})
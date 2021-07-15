new Vue({ 
  el: '#demo',
  
  data () {
    return {
      regInfo: { //  用户信息
        name: null,
      },
      users:[ //  成员列表
      ],
      val: '', //  输入框的值
      talkRoom: false, //  显示层级
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
                  this.regInfo.name = null
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
                if (item.name === this.regInfo.name) {
                  if(item.msg) {
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
                        text_right: true,
                      }
                    }, [
                      
                      h('img', {
                        attrs: {
                          src: item.url + item.res.key
                        },
                        class: {
                          imgs: true,
                          mgl5: true,
                          mbgf: true,
                        }
                      }),
                      h('span', {
                        class: {
                          mglr5: true,
                        }
                      }, ':'),
                      h('span', {
                        class: {
                          msg: true,
                          mgr5: true,
                          mbgd: true,
                        }
                      }, item.name),
                    ])
                  }
                } else {
                  if (item.name && item.msg) {
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
                      h('img', {
                        attrs: {
                          src: item.url + item.res.key
                        },
                        class: {
                          imgs: true,
                          mgl5: true,
                          mbgf: true,
                        }
                      }),
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
            h('input', {
              attrs: {
                type: 'file'
              },
              style: {
                display: 'none'
              },

              ref: 'upload',
              on: {
                change: (e) => {
                  console.log(e.target.files)
                  let file = e.target.files[0]
                  e.target.value = null
                  let reader = new FileReader()
                  reader.readAsDataURL(file)
                  reader.onloadend = function (res) {
                    // console.log(res)
                    // console.log(this.result)

                    let content = {
                      name: self.regInfo.name,
                      img: this.result,
                      sendTime: new Date()
                    }
                    var socket = io() 
                    //  向服务端发送数据--content
                    socket.emit('client', content)
                  }
                }
              }
            }, '上传'),
            h('span', {
              style: {
                borderRadius: '50%',
                'background-color': '#ccc',
                color: '#fff',
                padding: '10px 14px',
                textAlign: 'center',
                fontSize: '20px',
                verticalAlign: 'middle',
                marginLeft: '10px',
              },
              on: {
                click: () => {
                  this.$refs.upload.click()
                },
               
              }
            }, '+'),
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
  created() {
    let name = localStorage.getItem("name");

    if (name) {
      // userInfo = JSON.parse(userInfo)
      console.log((name))
      this.talkRoom = true
      this.regInfo = {
        name: name
      }
    }
  },
  methods: {
    /**
     * 事件--用户注册或者登录
     */
    reg_login () {
      var self = this
      if (this.regInfo.name === null) {
        alert("昵称不能为空")
      } else {
        //  请求后台数据
        axios.post('/users/login', {
          name: self.regInfo.name,
          pwd: self.regInfo.pwd
        })
        .then(function (response) {
          //  获得后台查询结果
          let { code, msg, data } = response.data
          if (code === 200) {
            alert(msg)
            localStorage.setItem("name", data[0].name)
            self.talkRoom = true
            self.regInfo = data[0]
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    },

    /**
     * 事件--客户端发送信息
     */
    
    socketMsg (msg) {
      if (msg === null) {
        alert('消息不能为空')
      } else {
        let content = {
          name: this.regInfo.name,
          msg: msg,
          sendTime: new Date()
        }
        var socket = io() 
        //  向服务端发送数据--content
        socket.emit('client', content)
        this.val = null
      }
    },
  },

  /**
   * 生命周期函数--页面渲染完成
   */
  mounted() {
    var socket = io()
    //  接收服务端发送过来的数据
    socket.on('serve', (content) => {
      console.log(content)
      this.users.push(content)
    })
  },
})
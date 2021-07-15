const qiniu = require('qiniu')
const fs = require('fs')



let qn = {}

/**
 * 客户端上传
 */
qn.uptoken = (bucket) => {
//  let bucket = 'huaxiaohong' //  七牛云存储空间名
 let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket }) //  指定七牛云存储空间
 let accessKey = 'tyDdXJqI9tXNqnQbHiwCMLvwlVovEUzAJLxxj93s' //  AK
 let secretKey = 'c5AHPMBuLuajncSk27CiVN0H8E6TShec956uVkGk' //  SK
 let mac = new qiniu.auth.digest.Mac(accessKey, secretKey) //  鉴权对象
 let uploadToken = putPolicy.uploadToken(mac) //  获取上传凭证1
  putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  let tk = {
    'token': uploadToken,
    'url': 'http://mziu.club/'
  }
  return tk
}


/**
 * 服务端上传
 */
qn.upImg = (temporaryImg) => {
  let bucket = 'huaxiaohong' //  七牛云存储空间名
  let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket }) //  指定七牛云存储空间
  let accessKey = 'tyDdXJqI9tXNqnQbHiwCMLvwlVovEUzAJLxxj93s' //  AK
  let secretKey = 'c5AHPMBuLuajncSk27CiVN0H8E6TShec956uVkGk' //  SK
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey) //  鉴权对象
  let uploadToken = putPolicy.uploadToken(mac) //  获取上传凭证
  let config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z2 //  空间对应机房
  let localFile = './' + temporaryImg
  let formUploader = new qiniu.form_up.FormUploader(config) //  生成表单上传的类
  let putExtra = new qiniu.form_up.PutExtra() //  生成表单提交额外参数
  let key = temporaryImg //  重命名文件
  /**
   * 上传本地文件
   * @param uploadToken 上传凭证
   * @param key 目标文件名
   * @param localFile 本地文件路径
   * @param putExtra 额外选项
   * @param callback
   */

  return new Promise ((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
          fs.unlink(localFile, function(err){
            if(err){
                throw err;
            }
            console.log('文件:'+ localFile +'删除成功！');
          })
          resolve(respBody)
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          resolve(respBody)
        }
    });
})
}

module.exports = qn
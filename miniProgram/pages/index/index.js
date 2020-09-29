
Page({
  data:{
    img:"",
    video:""
  },
  // 文件的上传（选择图片）
  upload(){
    var _this=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("选择图片成功",res);
        _this.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  uploadImage(fileUrl){
    
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+'.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        console.log("图片上传成功",res);
        this.setData({
            img:res.fileID
        })
      },
      fail: err => {
       console.log("图片上传失败",err);
      }
    })
  },
  // 上传视频
  uploadVideo(){
    // 选择视频
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: '6000',
      camera: 'back',
      success(res) {
        console.log("选择视频成功",res.tempFilePath)
        wx.cloud.uploadFile({
          cloudPath: 'video.mp4',
          filePath: res.tempFilePath, // 文件路径
          success: res => {
            console.log("视频上传成功",res);
            this.setData({
              video:res.fileID
            })
          },
          fail: err => {
           console.log("视频上传失败",err);
          }
        })
      },fail(err){
        console.log("选择视频失败",err);
      }
    })

  },
  // 上传excle
  uploadExcle(){
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        console.log("文件选择成功",res);
        wx.cloud.uploadFile({
          cloudPath: "已做.xls",
          filePath: res.tempFiles[0].path, // 文件路径
          success: res => {
            console.log("excle上传成功",res);
          },
          fail: err => {
           console.log("excle上传失败",err);
          }
        })
      }
    })
  },
  openExcle(){
    wx.cloud.downloadFile({
      fileID: 'cloud://yyzh-vibvw.7979-yyzh-vibvw-1302996810/已做.xls',
      success: res => {
        // get temp file path
        console.log("文件下载成功",res);
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功',res)
          },fail(err){
            console.log("文件打开失败",err)
          }
        })

      },
      fail: err => {
        // handle error
        console.log("文件下载失败",err);
      }
    })
  }
})

// miniProgram/pages/addmovie/addmovie.js
let title=""
let meta=""
let evaluate=""
let fileId=""
const DB=wx.cloud.database().collection("movie");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    imgUrl:""
  },
  title(event){
    title=event.detail.value
  },
  mate(event){
    meta=event.detail.value
  },
  evaluate(event){
    evaluate=event.detail.value
  },
  handelAdd(){
    DB.add({
      data:{
        title:title,
        meta:meta,
        evaluate:evaluate,
        pic:fileId
      },success(res){
        console.log("添加成功",res)
        wx.showToast({
          title: '添加成功',
        })
      },fail(err){
        console.log("添加失败",err);
      }
    })
  },
  handelImg(){
    var _this=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("选择图片成功",res.tempFilePaths[0]);
        _this.setData({
          imgUrl:res.tempFilePaths[0]
        }),
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png',
          filePath: res.tempFilePaths[0], // 文件路径
          success: res => {
            // get resource ID
            console.log("上传成功",res);
            fileId=res.fileID
          },
          fail: err => {
            console.log("上传失败",err)
          }
        })
      },fail(err){
        console.log("选择图片失败",err);
      }
    })
  },
  handelClear(){
      this.setData({
        value:"",
        imgUrl:""
      })
  }
})
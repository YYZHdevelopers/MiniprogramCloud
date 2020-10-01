// pages/admin/admin.js
const DB=wx.cloud.database().collection("user")

let name=""
let age=""
let city=""
let fileID=""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    imgUrl:""
  },
  clearInput(){
    this.setData({
      value:"",
      imgUrl:""
    })
  },
  handelAddname(event){
    name=event.detail.value
  },
  handelAddage(event){
    age=event.detail.value
  },
  handelAddcity(event){
    city=event.detail.value
  },
  // 添加数据
  handelAdddata(){
      var _this=this
    DB.add({
      data:{
        name:name,
        age:age,
        city:city,
        imgUrl:fileID
      },success(res){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        console.log("添加成功");     
      },fail(err){
        console.log("添加失败");
      }
    })
  },
  // 选择图片
  chooseImg(){
    var _this=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("选择图片成功",res)
        _this.setData({
          imgUrl:res.tempFilePaths[0]
        })
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png',
          filePath: res.tempFilePaths[0], // 文件路径
          success: res => {
            console.log("上传成功",res);
            fileID = res.fileID;
            
          },
          fail: err => {
            // handle error
            console.log("上传失败",err);
          }
        })


      },fail(err){
        console.log("选择图片失败",err);
      }
    })



  },
  

  // 跳转到用户页
  toUser(){
    wx.navigateTo({
      url:'../home/home'
    })
  }
})
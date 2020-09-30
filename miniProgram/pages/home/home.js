// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[]
  },
  refeshData(){
    var _this=this
    wx.cloud.callFunction({
      name:'getList',
      success(res){
        console.log("获取数据成功",res);
        _this.setData({
          userList:res.result.data
        })
      },fail(err){
        console.log("获取数据失败",err);
      }
    })



  },
  reBack(){
    wx.navigateTo({
      url:'../admin/admin'
    })
  }


})
// pages/admin/admin.js
const DB=wx.cloud.database().collection("user")

let name=""
let age=""
let city=""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:""
  },
  clearInput(){
    this.setData({
      value:""
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
        city:city
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
  // 跳转到用户页
  toUser(){
    wx.navigateTo({
      url:'../home/home'
    })
  }
})
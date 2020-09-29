let first=""
let second=""

Page({
  data:{
    name:[]
  },



firstAdd(event){
  first=event.detail.value
},
secondAdd(event){
  second=event.detail.value
},
handelAdd(){
  wx.cloud.callFunction({
      name:'add',
      data:{
        a:parseInt(first),
        b:parseInt(second)
      },success(res){
        console.log("请求成功",res);
      },fail(err){
        console.log("请求失败",err)
      }
  })
} ,
getUseropen_id(){
  wx.cloud.callFunction({
    name:'getopenId',
    success(res){
      console.log("获取成功",res.result.openid)
    },fail(err){
      console.log("获取失败",err);
    }


  })
},
// 通过数据库api获取数据
shujuku(){
  var _this=this
    wx.cloud.database().collection("user").get({
        success(res){
          console.log("获取成功",res),
          console.log("获取成功",res.data[0].name),
          _this.setData({
              name:res.data
          })
        }
    })
},


// 通过云函数获取数据
yunhanshu(){
  wx.cloud.callFunction({
    name:'getshuju',
    success(res){
      console.log("通过云函数获取数据成功",res);
    },fail(err){
      console.log("通过云函数获取数据失败",err);
    }

  })
}
})

const DB=wx.cloud.database().collection("list");
let name=""
let empId=""
let id=""

Page({
  // 从输入框中获取用户姓名
  addName(event){
   
    name=event.detail.value
  },
  // 从输入框中获取用户编号
  addEmployeeID(event){
    empId=event.detail.value
  },
  // 从输入框中获取用户id
  delInput(event){
    id=event.detail.value
  },
  // 更新的id
  udpInput(event){
    id=event.detail.value
  },
  // 更新的员工编号
  udpEmployeeID(event){
    empId=event.detail.value
  },
  // 添加数据
  addData(){
    DB.add({
      data:{
          name:name,
          employeeID:empId,
         
      },
      success(res){
        console.log("添加成功",res);
      },
      fail(err){
        console.log("添加失败",err);
      }
    })
  },
  // 删除数据
  delData(){
    DB.doc(id).remove({
      success(res){
        console.log("删除成功",res);
      },
      fail(err){
        console.log("删除失败",err);
      }
    })
  },
  // 修改数据
  udpData(){
    DB.doc(id).update({
      data:{
        employeeID:empId
      },
      success(res){
        console.log("修改成功",res);
      },
      fail(err){
        console.log("修改失败",err);
      }
    })

  },
  // 查询数据
  getData(){
    DB.get({
      success(res){
          console.log("查询成功",res); 
      }
    })
  }
})

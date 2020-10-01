// miniProgram/pages/pulldown/pulldown.js
const DB=wx.cloud.database().collection("movie")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:"",
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    DB.get({
      success(res){
        console.log(res.data);
        _this.setData({
          movieList:res.data
        })
      },fail(err){
        console.log(err);
      }
    })
  },
  onPullDownRefresh(){
    console.log("正在下拉~");
    var _this=this
    DB.get({
      success(res){
        console.log("获取数据成功",res)
        wx.stopPullDownRefresh()
        _this.setData({
          movieList:res.data
        })
      },fail(err){
        console.log("获取数据失败",err);
      }
    })
  },
  onReachBottom(){
    console.log("触底了~");
    let page=this.data.page+20;
    var _this=this
    DB.skip(page).get({
      success(res){
        console.log("获取数据成功",res)
        let new_data=res.data;
        // console.log("新数据",new_data)
        // 这里要用_this
        let old_data=_this.data.movieList
        // console.log("旧数据",old_data)
        _this.setData({
          movieList:old_data.concat(new_data),
          page:page
        })
      },fail(err){
        console.log("获取数据失败",err);
      }
    })
  }
})
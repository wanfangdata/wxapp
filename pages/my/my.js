var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tap:function(){
    wx.showModal({
      title: '提示',
      content: '啥也没有',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  gotoDownloadList:function(e){
    wx.navigateTo({
      url: '../dldList/dldList'
    });
  }
})

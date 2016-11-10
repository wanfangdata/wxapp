var app = getApp()
Page({
  data: {
      storageKey:'downloadList',
      paperList:[]
  },
  remove:function(id){
      var result = this.data.paperList.filter(function(item){return item.id!=id;});
      this.setData({
          paperList:result
      });
      wx.setStorageSync(this.data.storageKey, result);
  },
  tap:function(e){
      var that = this;
      var id = e.target.id;
      wx.showActionSheet({
        itemList: ['删除'],
        success: function(res) {
            if(res.tapIndex==0){
                that.remove(id);
            }
        }
      });
  },
  onLoad: function () {
    var list = wx.getStorageSync(this.data.storageKey); 
    if(list&&list.length>0){
      this.setData({
        paperList:list
      });
    }
  }
})

var testData = require('../search/data.js');
var util = require('../../utils/util.js');
Page({
  data: {
    animation:'',
    storageKey:'downloadList',
    downloaded:false,
    paper:{}
  },
  onLoad: function(option){
    var that = this;
    var list = wx.getStorageSync(this.data.storageKey); 
    testData.response.docs.map(function(paper){
      if(paper.Id === option.id){
        that.setData({paper : paper});
        return;
      }
    }); 
    if(list&&list.length>0&&list.some(function(item){
      return item.id == that.data.paper.Id;
    })){
      this.setData({downloaded:true});
    }
  },
  online:function(){
    wx.showModal({
      title: '微信小程序暂不支持',
      content: '哈哈哈',
      cancelText:'哈哈哈',
      confirmText:'同情你',
      success: function(res) {
        if (res.confirm) {}
      }
    });
  },
  successAnimation:function(){
    var that = this;
    that.setData({animation:'animation'});
    util.timeout(1000).then((value) => {
      that.setData({animation:''});
      that.setData({downloaded:true});
    });     
  }, 
  download:function(){
    var that = this;
    wx.showToast({
        title: '玩命下载中...',
        icon: 'loading',
        duration: 0
    });
    var list = wx.getStorageSync(that.data.storageKey),
        paper = {
            id:that.data.paper.Id,
            title:that.data.paper.Title[0],
            date:new Date().toLocaleString(),
            creator:that.data.paper.Creator,
            intro:that.data.paper.Abstract?that.data.paper.Abstract[0]:''
        };
    if(list&&list.length>0){
      list.push(paper);
    }else{
      list = [paper];
    }
    wx.setStorageSync(that.data.storageKey, list);
    util.timeout(2000).then((value) => {
      that.successAnimation();  
    });            
  },
  view:function(){
    wx.navigateTo({url: '../dldList/dldList'});
  },
  onReady: function() {    
    wx.setNavigationBarTitle({
      title: this.data.paper.Title[0]
    });
  }
})

var testData = require('../search/data.js');

Page({
  data: {
    animation:'',
    storageKey:'downloadList',
    text:{
      key:'download',
      value:'下载'
    },
    paper:{}
  },
  setView:function(){
      this.setData({text:{
        key:'view',
        value:'去下载列表查看'
      }});
  },
  onLoad: function(option){
    var that = this;
    var list = wx.getStorageSync(this.data.storageKey); 
    testData.response.docs.map(function(paper){
      if(paper.Id === option.id){
        that.setData({
          paper : paper
        });
        return;
      }
    }); 
    if(list&&list.length>0&&list.some(function(item){
      return item.id == that.data.paper.Id;
    })){
      this.setView();
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
    setTimeout(function(){
      that.setData({animation:''});
      that.setView();
    },3000);
  }, 
  tap:function(e){
    var that = this,
        action = {
          view:function(){
            wx.navigateTo({url: '../dldList/dldList'});
          },
          download:function(){
            wx.showToast({
              title: '玩命下载中...',
              icon: 'loading',
              duration: 2000
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
            setTimeout(function(){
              that.successAnimation();              
            },2000);
          }
        };
    console.log(e.target.id);
    //编译后不支持索引器
    if(e.target.id=='download'){
      console.log('download');
      action.download();
    }else{
      console.log('view');
      action.view()
    }
  },
  onReady: function() {    
    wx.setNavigationBarTitle({
      title: this.data.paper.Title[0]
    });
  }
})

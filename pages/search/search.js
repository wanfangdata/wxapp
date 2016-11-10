var testData = require('data.js');

Page({
  data: {},
  init:function(){
    this.setData({
      loading:false,
      more:true,
      page:1,
      rows:5,
      paperList:[]
    });
  },
  request:function(q){
    return {
      p:this.data.page,
      q:q,
      wt:'json',
      rows:this.data.rows,
      start:this.data.rows*(this.data.page-1)
    };
  },
  parseFeild:function(paperList,start){
    var result = [],
        sliceCount =function(parm,count,suffix){
            var count = count||50;
            return parm.length>count?(suffix?
            parm.slice(0,count)+suffix:
            parm.slice(0,count)):
            parm;
        }
    paperList.map(function(paper,i){
       result.push({
         index:start + i +1,
         id:paper.Id,
         title:sliceCount(paper.Title[0],20,'...'),
         abstr : sliceCount(paper.Abstract?paper.Abstract[0]:'',50,'...'),
         keyword : sliceCount(paper.Keyword_Machine,5)
       });
    });
    return result;
  },
  loadData:function(){
    var requestData = this.request(),
        paperList = testData.response.docs.slice(
          requestData.start,
          requestData.start + requestData.rows);
    return this.parseFeild(paperList,requestData.start);
  },
  stop:function(){
    this.setData({
      more:false
    });
    wx.hideNavigationBarLoading();
  },
  refresh:function(init){
    var pg = this,
        paperList = pg.loadData();
    if(paperList.length==0){
      pg.stop();
      return;
    }
    setTimeout (function(){
      pg.setData({
        paperList:init?paperList:pg.data.paperList.concat(paperList),
        loading:false
      });
      wx.hideNavigationBarLoading();
    },800);    
  },
  formSubmit: function(e) {
    this.init();
    wx.showToast({
        title: '玩命加载中...',
        icon: 'loading',
        duration: 700
    });     
    this.refresh(true);
  },
  lower:function(e){   
    wx.showNavigationBarLoading();
    this.setData({
      page:this.data.page+1,
      loading:true
    });
    this.refresh();
  },
  detail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id='+e.target.id
    });
  },
  onLoad: function () {
    this.init();
  }
})

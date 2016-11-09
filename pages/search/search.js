var testData = require('data.js');

Page({
  data: {
    page:1,
    rows:5,
    paperList:[]
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
  loadData:function(){
    var paper = {} ,
        paperList = [],
        requestData = this.request(),
        docs = testData.response.docs.slice(
          requestData.start,
          requestData.start + requestData.rows),
        sliceCount =function(parm,count,suffix){
            var count = count||50;
            return parm.length>count?(suffix?parm.slice(0,count)+suffix:parm.slice(0,count)):parm;
        }; 
    //if()
    for(var i = 0;i<docs.length;i++){
      paper = docs[i];
      paper.index = requestData.start + i +1;
      paper.title = sliceCount(paper.Title[0],20,'...');
      paper.abstract = sliceCount(paper.Abstract?paper.Abstract[0]:'',50,'...');
      paper.keyword = sliceCount(paper.Keyword_Machine,5);
      paperList.push(paper);
    }
    return paperList;
  },
  refresh:function(){
    var pg = this;
    setTimeout (function(){
      pg.setData({
        paperList:pg.data.paperList.concat(pg.loadData())
      });
      wx.hideNavigationBarLoading();
    },800);    
  },
  formSubmit: function(e) {
    this.setData({page:1});
    wx.showToast({
        title: '玩命加载中...',
        icon: 'loading',
        duration: 700
    });     
    this.refresh();
  },
  lower:function(e){
    console.log(this.data.page);
    wx.showNavigationBarLoading();
    this.setData({
      page:this.data.page+1
    });
    this.refresh();
  }
})

//logs.js
var util = require('../../utils/util.js')
var testData = require('data.js')
Page({
  data: {
    imgUrls: [
      'http://earth.wanfangdata.com.cn/admin/File/Download?fileName=dq-01.jpg',
      'http://earth.wanfangdata.com.cn/admin/File/Download?fileName=2016%e5%a4%a7%e6%b0%94%e5%a4%8d%e5%90%88%e6%b1%a1%e6%9f%93.gif',
      'http://http://earth.wanfangdata.com.cn/Areas/admin/Content/UEditor/dialogs/template/images/ad01.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    paperList:[]
  },
  formSubmit: function(e) {
    var query = e.detail.value;
    wx.request({
      url: 'http://168.160.184.180:8983/solr/WFPeriodical/select',
      data: {
        q: query.q ,
        wt: 'json',
        rows:5,
        start:10
      },
      header: {'Content-Type': 'application/json'},
      success: function(res) {console.log(res.data);}
    });
    var paper = {} ,
        paperList = [];
    for(var i = 0;i<testData.response.docs.length;i++){
      paper = testData.response.docs[i];
      paper.index = i + 1;
      paperList.push(paper);
    }
    this.setData({
      paperList:paperList
    });
  }
})

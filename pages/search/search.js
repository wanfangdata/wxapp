//logs.js
var util = require('../../utils/util.js')
var testData = require('testData.js')
Page({
  data: {
    paperList:[]
  },
  formSubmit: function(e) {
    var q = e.detail.value;
    wx.request({
      url: 'http://168.160.184.180:8983/solr/WFPeriodical/select',
      data: {
        q: q ,
        wt: 'json',
        rows:5,
        start:10
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
      }
    });
    this.setData({
      paperList:testData.response.docs
    });
  }
})

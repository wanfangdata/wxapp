//logs.js
var util = require('../../utils/util.js')
var testData = require('testData.js')
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,

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

Page({
  data: {
    imgUrls: [
      ['img/1.gif','img/2.gif','img/3.gif'],
      ['img/4.gif','img/5.gif','img/6.gif'],
      ['img/7.gif','img/8.gif','img/9.gif'],
      ['img/10.gif','img/11.gif','img/12.gif']
    ]
  },
  onLoad: function(){

  },
  tap:function(){
    wx.showActionSheet({
      itemList: ['加入购物车', '直接购买'],
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  }
})

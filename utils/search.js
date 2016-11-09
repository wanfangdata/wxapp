module.exports = function search(url,data){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
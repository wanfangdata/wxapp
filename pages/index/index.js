var resource = require('data.js');

Page({
    data: {
        resource:resource,
        intro:resource[0]
    },
    tab:function(e){
      var id = e.target.id;
      var introObj = {};
      for(var i = 0;i<resource.length;i++){
         resource[i].active = resource[i].id == id?(introObj = resource[i],'active'):'';
      }
      this.setData({
        resource:resource,
        intro:introObj
      });
    }
});
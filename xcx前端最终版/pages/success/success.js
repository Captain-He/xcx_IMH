var app = getApp();
Page({
  data: {
    trucks: ''
  },
  viewMylist:function(){
    wx.reLaunch({
    url: '../list/list'
  })

}
})


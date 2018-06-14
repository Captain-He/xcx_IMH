//main.js
//获取应用实例
var app = getApp()
Page({
  onLoad:function(options)
  {
    this.setData({
    title:options.title,
    img:options.img,
    author:options.author,
    date:options.date,
    url:options.contenturl
    })
  }
})

// pages/album/list.js
var app = getApp();
var page = 1;
var hadLastPage = false;

Page({
  /*goto: function () {
    wx.navigateTo({
      url: '../alter/alter',
    })
  },*/

  /**
   * 页面的初始数据
   */
  data: {
    albums: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page = 1;
    hadLastPage = false;
    this.setData({
      albums: []
    });
    this.loadList();

    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  loadList: function () {
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      })
      return;
    }

    var that = this;
    wx.request({
      method: 'post',
      url: 'http://xcx.caption-he.com.cn/xcx',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var listData = that.data.albums;
        for (var i = 0; i < res.data.length; i++) {
          listData.push(res.data[i]);
        }

        if (res.header["X-Pagination-Page-Count"] == res.header["X-Pagination-Current-Page"]) {
          hadLastPage = res.header["X-Pagination-Current-Page"];
        } else {
          page++;
        }

        that.setData({
          albums: listData
        });
        console.log(listData);
      },
    })
  }
})
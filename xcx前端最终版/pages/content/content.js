// pages/album/list.js
var app = getApp();

Page({


  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      time: options.time,
      name: options.name,
      content: options.content,
      img: options.img,
      box_num: options.box_num
    });
    if (options.mark == 0) {
      this.setData({
        mark: "本次未服药",
        showview: true
      })
    }
    if (options.mark == 1) {
      this.setData({
        mark: "本次已服药",
        showview: false
      })
    }
    wx.setStorage({
      key: "id",
      data: options.id
    })
    wx.setStorage({
      key: "user_id",
      data: options.user_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  call: function () {
    var code = '';
    var openid = '';
    var call_num = '';
    var call_name = '';
    var that = this;
    var _this = this;
    wx.login({
      //获取code
      success: function (res) {
        code = res.code //返回code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe414a8d62204cc8b&secret=869591b29992a49fb460b22278c85678&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            openid = res.data.openid //返回openid
            wx.request({
              url: 'http://xcx.caption-he.com.cn/xcx/home/index/callback',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: { openid: openid },
              success: function (res) {
                var data = res.data;
                console.log(data);
                //do something
                if (data[0] == "0") {
               wx.showToast({
                 title: '请设置联系人',
               })
                } else {
                  wx.makePhoneCall({
                    phoneNumber: res.data[2],
                  })

                }
              }
            })
          }
        });
      }
    });
  },
  xiu: function () {
    wx.getStorage({
      key: 'id',
      success: function (res) {
        var message_id = res.data;
        wx.getStorage({
          key: 'user_id',
          success: function (res) {
            var user_id = res.data;
            wx.navigateTo({
              url: '../../pages/alter/alter?user_id=' + user_id + '&message_id=' + message_id + '',
            })
          }
        })
      }
    })
  },
  shan: function () {
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除中',
            icon: 'loading',
            duration: 10000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 2000);
          /*删除事件*/
          wx.getStorage({
            key: 'id',
            success: function (res) {
              var id = res.data;
              wx.getStorage({
                key: 'user_id',
                success: function (res) {
                  var user_id = res.data;
                  wx.request({
                    url: 'http://xcx.caption-he.com.cn/xcx/home/index/delete', //仅为示例，并非真实的接口地址
                    data: {
                      message_id: id,
                      user_id: user_id
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                      if (res.data == '1') {
                        wx.showToast({
                          title: '删除成功！',
                        });
                        wx.switchTab({
                          url: '../../pages/list/list'
                        })
                      }
                      else {
                        wx.showToast({
                          title: '删除失败！',
                        });
                      }
                    }
                  })

                }
              })
            }
          })
        }
      }
    })
  },
})



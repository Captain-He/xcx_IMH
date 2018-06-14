var app=getApp();

Page({
  data: {
    textHint: "请认填写用药者信息！",
    call_num:'',
    call_name:''
  },
  formReset: function () {
    this.setData({
      infoList: list
    })
  },
  onLoad:function(){
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
            console.log(openid);
            wx.request({
              url: 'http://xcx.caption-he.com.cn/xcx/home/index/callback',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {openid:openid},
              success: function (res) {
                var data = res.data;
                console.log("#");
                console.log(data[2]);
                console.log("#");
                //do something
                if (data[0]=='0') {
                _this.setData({
                  showview1:false,
                  showview2:true
                
                })
                } else {
                  _this.setData({
                    showview1:true,
                    showview2: false,
                    name:data[1],
                    num:data[2]
                })

                }
              }
            })
          }
        });
      }
    });
  },
  formSubmit: function (e) {
      var code = '';
      var openid = '';
      var call_num = '';
      var call_name = '';
      var that = this;
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
              wx.setStorage({
                key: 'userid',
                data: openid,
              })
              call_num = e.detail.value.call_num;
              call_name = e.detail.value.call_name;
              wx.request({
                url: 'http://xcx.caption-he.com.cn/xcx/home/index/initcall',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: { openid: openid, call_num: call_num, call_name: call_name },
                success: function (res) {
                  var data = res.data;
                  //do something
                  if (data == '1') {
                    wx.showToast({
                      title: '添加成功！',
                    })
                    wx.switchTab({
                      url: '../../pages/user/user'
                    })
                  } else {
                    wx.showToast({
                      title: '号码格式有误！',
                    })

                  }
                }
              })
            }
          });
        }
      });
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
                key: 'userid',
                success: function (res) {
                  var user_id = res.data;
                  console.log(user_id);
                  wx.request({
                    url: 'http://xcx.caption-he.com.cn/xcx/home/index/dcall', //仅为示例，并非真实的接口地址
                    data: {
                      user_id: user_id
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      if (res.data == '1') {
                        wx.showToast({
                          title: '删除成功！',
                        });
                        wx.switchTab({
                          url: '../../pages/user/user'
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
      }
    })
  },
})
//app.js
App({
  globalData: {
    appid: 'wxe414a8d62204cc8b',//appid需自己提供，此处的appid我随机编写
    secret: '869591b29992a49fb460b22278c85678',//secret需自己提供，此处的secret我随机编写
  },
  onLaunch: function () {
    var code = '';
    var openid = '';
    var user = '';
    var that = this;
    wx.login({
      //获取code
      success: function (res) {
        code = res.code //返回code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            openid = res.data.openid //返回openid
          }
        });
      }
    });

    //调用应用实例的方法获取全局数据
    that.getUserInfo(function (personInfo) {
      //更新数据
      user = personInfo;
      wx.request({
        url: 'http://xcx.caption-he.com.cn/xcx/home/index/init',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: { user_id: openid, nickname: user.nickName },
        success: function (res) {
          wx.showToast({
            title: '欢迎使用IMH',
          });
        }
      })

    });


  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.personInfo) {
      typeof cb == "function" && cb(this.globalData.personInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.personInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.personInfo)
            }
          })
        }
      })
    }
  },
})
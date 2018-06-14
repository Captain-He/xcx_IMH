var app = getApp();
var type = [
  {
    name: '选择药格编号',
    id: ''
  },
  {
    name: "1号格子",
    id: '1'
  },
  {
    name: "2号格子",
    id: '2'
  },
  {
    name: "3号格子",
    id: "3"
  },
  {
    name: "4号格子",
    id: "4"
  },
  {
    name: "5号格子",
    id: "5"
  },
  {
    name: "6号格子",
    id: "6"
  }

];

var list = [
  {
    information: '药格编号',
    select: '请选择药格编号',
    bindBtn: 'box_num',
    name: 'box_num',
    val: ''
  }
];
Page({
  data: {
    textHint: "请认真填写药品定时信息！",
    hiddenBoolean: true,
    inputHidden: true,
    className: ['header'],
    infoList: list,
    screenBtn: '',
    infoId: '',
    time: '12:00',
    img_l: ''
  },
  
  box_num: function (e) {
    var addId = e.currentTarget.id;
    if (addId <=2) {
      this.setData({
        infoId: addId,
        options: type,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'choseBtn'
      });
    }
  },

  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  choseBtn: function (e) {
    var me, zone;
    var dataId = e.currentTarget.id,
      arr = this.data.infoList[this.data.infoId];
    if (this.data.infoId <=2) {
      me = type;
    } else {
      me = size;
    }
    for (var i = 0; i < me.length; i++) {
      if (me[i].id == dataId) {
        zone = me[i].name;
      }
    }
    this.data.infoList[this.data.infoId].val = dataId;
    this.data.infoList[this.data.infoId].select = zone;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: '',
      infoList: newInfo
    })
  },
  formReset: function () {
    this.setData({
      infoList: list
    })
  },
  formSubmit: function (e) {
    var _this = this;
   wx.getStorage({
     key: 'user_id',
     success: function(res) {
       var user_id = res.data;
       wx.getStorage({
         key: 'id',
         success: function(res) {
           var message_id = res.data;
           wx.uploadFile({
             url: 'http://xcx.caption-he.com.cn/xcx/home/index/alter', //接口
             filePath: _this.data.img_l[0],
             name: 'file',
             formData: {
               'user_id': user_id,
               'message_name': e.detail.value.message_name,
               'timer': e.detail.value.time,
               'box_num': e.detail.value.box_num,
               'content': e.detail.value.content,
               'message_id':message_id
             },
             success: function (res) {
               var data = res.data;
               //do something
               if (data == '1') {
                 wx.navigateTo({
                   url: '../success/success',
                 })
               } else {
                 wx.showToast({
                   title: '添加失败！',
                 })

               }

             },
             fail: function (error) {
               wx.showToast({
                 title: '添加失败！',
               })
             }
           })
         },
       })
     },
   })
},
  chooseImg: function () {
    var _this = this;
    wx.chooseImage({

      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        _this.setData({
          img_l: res.tempFilePaths
        })


      }
    })
  },
 
  preview_img: function () {
    wx.previewImage({
      current: this.data.img_l, // 当前显示图片的http链接
      urls: this.data.img_l // 需要预览的图片http链接列表
    })
  }

})
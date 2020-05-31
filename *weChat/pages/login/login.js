// pages/login/login.js
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

  },
  wechatLogin: function () {
    console.log("wechatLogin");
  },
  doubanLogin: function () {
    console.log("doubanLogin");
  },
  btmOpenMethod: function () {
    console.log("btmOpenMethod");
    wx.navigateTo({
      url: '../aggrement/aggrement',
    })
  }
})
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  
  onReady(options){
    console.log('onready', options)
  },
  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onTap() {
    wx.navigateTo({
      url: '/pages/automator/automator',
    })
  }
})

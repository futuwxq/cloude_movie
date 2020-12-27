// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch: false,
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载数据
    wx.showLoading({
      title: '加载中',
    })
    // 获取电影列表的数据
    wx.cloud.callFunction({
      name: 'getMovieList'
    }).then((res) => {
      // console.log(res.result.data)
      this.setData({
        movies: res.result.data
      })
      // 已经请求数据，停止显示图标
      wx.hideLoading()
    })

  },

  /**
   * 改变搜索状态
   */
  onSearching() {
    this.setData({
      isSearch:true
    })
  },
  /**
   * 
   */
  handleCancling() {
    this.setData({
      isSearch:false
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
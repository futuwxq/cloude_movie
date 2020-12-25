// miniprogram/pages/movie-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    imgs:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    // 发起详细数据的请求
    wx.cloud.callFunction({
      name:'getMovieById',
      data: {
        id
      },
    }).then( res => {
      // console.log(res.result.data[0].id)
      let result = res.result.data[0]
      this.setData({
        'details.导演': result.director,
        'details.主演':result.starring,
        'details.国家':result.country,
        'details.类型':result.genre,
        'details.年份':result.release_date + '年',
        'details.时长':result.runtime + '分钟',
        'imgs.url':result.cover,
        'imgs.title':result.title,
        'imgs.intro':result.intro,
        'imgs.like':result.like
      })
    }

)
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
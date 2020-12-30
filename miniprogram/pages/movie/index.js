// pages/movie/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moviedetail: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 加载数据
        wx.showLoading({
                title: '加载中',
            })
            // 获取推荐页的数据
        wx.cloud.callFunction({
            name: 'getRecommendMovie'
        }).then((res) => {
            console.log(res.result.data)
            this.setData({
                    moviedetail: res.result.data[0]
                })
                // 已经请求数据，停止显示图标
            wx.hideLoading()
        })
    },
    /**
     * 上传用户喜欢状态
     */
    onPostLike(e) {
        let { like, count } = e.detail
            // 更新数据库
        wx.cloud.callFunction({
            // 云函数名称
            name: "updatePosterCollect",
            // 传给云函数的参数 
            data: {
                count,
                like,
                _index: this.data.moviedetail._index
            }
        }).then((res) => {
            console.log(res)
        })
    }
})
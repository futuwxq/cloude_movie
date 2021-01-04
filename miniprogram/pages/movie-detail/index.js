// miniprogram/pages/movie-detail/index.js
var showModelBev = require('../../components/behaviors/showModel.js')
Page({
    behaviors: [showModelBev],

    /**
     * 页面的初始数据
     */
    data: {
        details: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 加载数据
        wx.showLoading({
            title: '加载中',
        })
        let id = options.id
        this._getMovieDetail(id)
    },
    /**
     * 
     * 提交like状态
     */
    onPostLike(e) {
        const { like, count } = e.detail
        const id = this.data.details.id
        this.postLike(id, like, count, "updateMovieLike")
        this.postCollect(like, id)

        // 更新数据库
        // wx.cloud.callFunction({
        //     // 云函数名称
        //     name: "updateMovieLike",
        //     // 传给云函数的参数 
        //     data: {
        //         count,
        //         like,
        //         id: this.data.details.id
        //     }
        // }).then((res) => {
        //     console.log(res)
        // })
    },
    /**
     * 
     *获取电影详情页数据
     */
    _getMovieDetail(id) {
        // 发起详细数据的请求
        wx.cloud.callFunction({
            name: 'getMovieById',
            data: {
                id
            },
        }).then(res => {
                // console.log(res.result.data[0].id)
                let result = res.result.data[0]
                this.setData({
                        details: result
                    })
                    // 已经请求数据，停止显示图标
                wx.hideLoading()
            }

        )
    },
})
// miniprogram/pages/movie-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        details: {

        },
        imgs: {}
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
        console.log(id)
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
                        'details.导演': result.director,
                        'details.主演': result.starring,
                        'details.国家': result.country,
                        'details.类型': result.genre,
                        'details.年份': result.release_date + '年',
                        'details.时长': result.runtime + '分钟',
                        'imgs.url': result.cover,
                        'imgs.title': result.title,
                        'imgs.intro': result.intro,
                        'imgs.like': result.like,
                        'imgs.id': result.id,
                    })
                    // 已经请求数据，停止显示图标
                wx.hideLoading()
            }

        )
    },
    /**
     * 
     * 提交like状态
     */
    onPostLike(e) {
        let { like, count } = e.detail
            // 更新数据库
        wx.cloud.callFunction({
            // 云函数名称
            name: "updateMovieLike",
            // 传给云函数的参数 
            data: {
                count,
                like,
                id: this.data.imgs.id
            }
        }).then((res) => {
            console.log(res)
        })
    }
})
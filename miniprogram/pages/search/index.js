// pages/search/index.js
import { MovieModel } from '../../models/movie';
const movieModel = new MovieModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSearch: false,
        movies: [],
        more: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 加载数据
        wx.showLoading({
                title: '加载中',
            })
            // 获取电影列表的数据

        movieModel.getMovieList(0).then(res => {
                this.setData({
                        movies: res
                    })
                    // 已经请求数据，停止显示图标
                wx.hideLoading()
            })
            // wx.cloud.callFunction({
            //     name: 'getMovieList',
            //     data: {
            //         start: 0
            //     }
            // }).then((res) => {
            //     // console.log(res.result.data)
            //     this.setData({
            //             movies: res.result.data
            //         })
            //         // 已经请求数据，停止显示图标
            //     wx.hideLoading()
            // })

    },

    /**
     * 改变搜索状态
     */
    onSearching() {
        this.setData({
            isSearch: true
        })
    },
    /**
     * 
     */
    handleCancling() {
        this.setData({
            isSearch: false
        })
    },
    /**
     * 
     */
    onToBottom(e) {
        console.log(e);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // this.setData({
        //     more: true
        // })
        // console.log(this.data.more, 1);
        console.log("触底");
        // 加载数据
        wx.showLoading({
            title: '加载中',
        })
        const start = this.data.movies.length;
        // 获取电影列表的数据
        wx.cloud.callFunction({
            name: 'getMovieList',
            data: {
                start,
            }
        }).then((res) => {
            console.log(res.result.data, "更多")
            this.setData({
                movies: this.data.movies.concat(res.result.data)
            })
            wx.hideLoading()
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
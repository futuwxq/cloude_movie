// pages/movie/index.js
// import {
//     ShowModelBev
// } from "../../components/behaviors/showModel.js"

var showModelBev = require('../../components/behaviors/showModel.js')
Page({
    behaviors: [showModelBev],
    /**
     * 页面的初始数据
     */
    data: {
        moviedetail: {},
        // modalShow: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 加载数据
        wx.showLoading({
            title: '加载中',
        })
        this._getOneMovie()
    },

    /**
     * 上传用户喜欢状态和数量
     */
    onPostLike(e) {
        const { like, count } = e.detail
        const id = this.data.moviedetail.id
        this.postLike(id, like, count, "updatePosterCollect")
        this.postCollect(like, id)
    },
    /**
     * 上传用户喜欢的状态和数量
     */
    // postLike(id, like, count, name) {
    //     // 更新数据库
    //     wx.cloud.callFunction({
    //         // 云函数名称
    //         name,
    //         // 传给云函数的参数 
    //         data: {
    //             count,
    //             like,
    //             id
    //         }
    //     }).then((res) => {
    //         console.log(res)
    //     })
    // },
    // /**
    //  * 
    //  * 新建收藏表
    //  */
    // buildCollect() {
    //     wx.cloud.callFunction({
    //         name: 'initCollectMovie',
    //     }).then((res) => {
    //         console.log(res)
    //     })
    // },
    // /**
    //  * 上传用户喜欢的电影
    //  */
    // postCollect(like, id) {
    //     wx.cloud.callFunction({
    //         name: 'updateCollectMovie',
    //         data: {
    //             like,
    //             id,
    //         }
    //     }).then((res) => {
    //         console.log(res)
    //     })

    // },
    // /**
    //  * 显示授权状态框
    //  */
    // OnLogin() {
    //     // 弹出授权框 
    //     this._showModel()

    // },
    /**
     * 登录成功
     */
    // LoginSuccess() {
    //     // 收起登录框
    //     this.setData({
    //         modalShow: false
    //     })
    //     this.buildCollect()
    // },
    // /**
    //  * 授权失败
    //  */
    // LoginFail() {
    //     // 收起登录框
    //     this.setData({
    //         modalShow: false
    //     })
    //     wx.showToast({
    //         title: '未授权无法收藏影片',
    //         icon: 'none'
    //     })
    // },
    /**
     * 
     * 获取影片数据
     */
    _getOneMovie() {
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
    // _isModalShow() {
    //     // 判断用户授权是否弹出授权框
    //     wx.getSetting({
    //         success: (res) => {
    //             console.log(res)
    //             if (!res.authSetting['scope.userInfo']) {
    //                 this.setData({
    //                     modalShow: false,
    //                 })
    //             }
    //         }
    //     })
    // },
    // _showModel() {
    //     this.setData({
    //         modalShow: true
    //     })
    // }
})
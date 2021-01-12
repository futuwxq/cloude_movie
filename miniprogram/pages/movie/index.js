// pages/movie/index.js
// import {
//     ShowModelBev
// } from "../../components/behaviors/showModel.js"
const app = getApp(); //写在页面顶部page()外
const showModelBev = require('../../components/behaviors/showModel.js')
import { MovieModel } from '../../models/movie';
const movieModel = new MovieModel()
Page({
    behaviors: [showModelBev],
    /**
     * 页面的初始数据
     */
    data: {
        moviedetail: {},
        like: false
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
    onShow() {
        // console.log(options)
        // if (app.globalData.collectChange) {
        // console.log('11')

        // wx.showLoading({
        //     title: '加载中',
        // })
        this._getOneMovie()
            // app.globalData.collectChange = false

        // }

    },
    /**
     * 上传用户喜欢状态和数量
     */
    onPostLike(e) {
        console.log('click');
        const { like, count } = e.detail
        const id = this.data.moviedetail.id
            // 上传数据 like的数量
        this.postLike(id, count)
            // 更新收藏夹 移除或者添加
        this.updateCollect(like, id)
        this.onShowToast(like)

        //    刷新电影数据
        // this._getOneMovie()

        // app.globalData.movieLike = random(16)
        // console.log(app.globalData.movieLike);

    },
    /**
     * toast 提示信息
     */
    onShowToast(like) {
        if (like) {
            wx.showToast({
                title: '收藏成功',
                icon: 'none'
            })
        } else {
            wx.showToast({
                title: '取消收藏',
                icon: 'none'
            })
        }
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

        // 获取电影列表的数据
        movieModel.getOneMovie().then(res => {
            const week = new Date().getDay()
                // console.log(res);
            this.setData({
                moviedetail: res[week]
            })

            const id = this.data.moviedetail.id
            console.log(id);

            // 已经请求数据，停止显示图标
            // 获取喜欢状态
            return movieModel.iscollectByID(id)
        }).then(res => {
            this.setData({
                like: res
            })
            wx.hideLoading()
        })


        // 获取推荐页的数据
        // wx.cloud.callFunction({
        //     name: 'getRecommendMovie'
        // }).then((res) => {
        //     // console.log(res.result.list)
        //     this.setData({
        //             moviedetail: res.result.list[0]
        //         })
        //         // 已经请求数据，停止显示图标
        //     wx.hideLoading()
        // })
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
// miniprogram/pages/movie-detail/index.js
const showModelBev = require('../../components/behaviors/showModel.js')
import strToBool from '../../utils/common.js';
import { MovieModel } from '../../models/movie';
const movieModel = new MovieModel()
Page({
    behaviors: [showModelBev],

    /**
     * 页面的初始数据
     */
    data: {
        details: {},
        like: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 加载数据
        wx.showLoading({
            title: '加载中',
        })
        const { id } = options
        // if (like === "true") {
        //     like = true
        // } else {
        //     like = false
        // }
        // console.log(strToBool(like));
        // this.setData({
        //     like,
        // })
        this._getMovieDetail(id)
        this._getFavor(id)
        wx.hideLoading()


    },
    /**
     * 
     * 提交like状态
     */
    onPostLike(e) {
        const { like, count } = e.detail
        const id = this.data.details.id
            // 上传数据 like的数量
        this.postLike(id, count)
            // 更新收藏夹 移除或者添加
        this.updateCollect(like, id)

        // const { like, count } = e.detail
        // const id = this.data.details.id
        // this.postLike(id, like, count)
        // this.updateCollect(like, id)

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
        movieModel.getMovieById(id).then(res => {
                // console.log(res.result.data[0])
                // const result = res.result.data[0]
                this.setData({
                    details: res
                })
            }

        )
    },
    /**
     * 获取电影的喜欢状态
     */
    _getFavor(id) {
        console.log(id);
        movieModel.iscollectByID(id).then(res => {
            console.log(res);
            this.setData({
                like: res
            })
        })
    }
})
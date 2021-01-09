// pages/profile/index.js
// const app = getApp(); //写在页面顶部page()外
import { UserAuthorizedModel } from '../../models/userAuthorized';
import { MovieModel } from '../../models/movie';
const userAuthorizedModel = new UserAuthorizedModel()
const movieModel = new MovieModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        collections: [],
        loading: false,
        isMore: false,
        currentCollection: [],
        index: 1
    },
    // observers: {
    //     'app.globalData.movieLike' (newval, oldVal) {
    //         console.log(newval);
    //         this._getCollection()
    //     }
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this._userAuthorized()
        // this._getCollection()
        // wx.cloud.callFunction({
        //     name: 'getUserById'
        // }).then(res => {
        //     console.log(res);
        // })
        // console.log('onUnload');
        // this._userAuthorized()
        // this._getCollection()
        // console.log(app.globalData.movieLike);


    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log('onShow');
        this._userAuthorized()
        if (this.data.authorized) {
            this._getCollection()
        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    // onTabItemTap: function() {
    //     console.log('onUnload');
    //     wx.showLoading({
    //         title: '加载中',
    //     })
    //     this._getCollection()
    // },
    onUserGetInfo: function(event) {
        const { userInfo } = event.detail
        if (userInfo) {
            this.setData({
                    userInfo,
                    authorized: true
                })
                // 上传用户的信息
            const nickName = userInfo.nickName
            userAuthorizedModel.getUser().then(res => {
                if (res) { // 没有注册
                    userAuthorizedModel.saveUser(nickName)
                        // 注册收藏夹
                        // userAuthorizedModel.buildCollect()
                        // this._getCollection()
                }
            })
        }
    },
    /**
     * 加载更多
     */
    onLoading() {
        // console.log(this.data.index);
        this.setData({
            loading: true
        })
        this._getCollection(++this.data.index)
        this.setData({
            isMore: false,
            loading: false
        })
    },
    /**
     * 进入关于页面
     */
    goToAbout() {
        wx.navigateTo({
            url: '/pages/about/index'
        })
    },
    _getCollection(index) {
        wx.showLoading({
            title: '加载中',
        })
        movieModel.getCollection(index).then(res => {
            // console.log(res);

            this.setData({
                collections: res
            })

            if (movieModel.getCollectionLen(index)) {
                this.setData({
                    isMore: true
                })
            }
            // 已经请求数据，停止显示图标
            wx.hideLoading()
        })

    },
    // 用户是否授权。授权之后获取用户的信息
    _userAuthorized() {
        userAuthorizedModel.userAuthorized().then(res => {
                if (res) {
                    this._getCollection()
                    this._changeAuthorized()
                    return userAuthorizedModel.getUserInfor()
                }
            }).then(res => {
                this.setData({
                    userInfo: res,
                })
            })
            // wx.getSetting({
            //     // 箭头函数不会改变 this
            //     success: (res) => {
            //         console.log(res);
            //         if (res.authSetting['scope.userInfo']) {
            //             wx.getUserInfo({
            //                 success: (res) => {
            //                     this.setData({
            //                         userInfo: res.userInfo,
            //                         authorized: true
            //                     })
            //                 }
            //             })
            //         }
            //     }
            // })
    },
    /**
     *改变授权状态
     */
    _changeAuthorized() {
        this.setData({
            authorized: true
        })
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
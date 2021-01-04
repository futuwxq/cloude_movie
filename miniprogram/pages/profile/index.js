// pages/profile/index.js
const app = getApp(); //写在页面顶部page()外
import { UserAuthorizedModel } from '../../models/userAuthorized';
const userAuthorizedModel = new UserAuthorizedModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        collections: []
    },
    observers: {
        'app.globalData.movieLike' (newval, oldVal) {
            console.log(newval);
            this._getCollection()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log('onUnload');
        this._userAuthorized()
        this._getCollection()
            // console.log(app.globalData.movieLike);


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
            userAuthorizedModel.saveUser(nickName)
        }
    },
    /**
     * 用户登录后，保存用户信息
     */
    // saveUser(nickName) {
    //     const registerdate = new Date()
    //     wx.cloud.callFunction({
    //         name: 'addUser',
    //         data: {
    //             nickName,
    //             registerdate
    //         }
    //     }).then(res => {
    //         console.log(res);
    //     })
    // },
    /**
     * 进入关于页面
     */
    onAbout() {
        // console.log(e);
        wx.navigateTo({
            url: '/pages/about/index'
        })
    },
    _getCollection() {
        wx.cloud.callFunction({
            name: 'getCollection'
        }).then(res => {
            res.result.list[0]
            const collections = [...res.result.list[0].infor, ...res.result.list[0].reinfor]
            this.setData({
                    collections,
                })
                // wx.hideLoading()
                // console.log(collections);
        })

    },
    // 用户是否授权。授权之后获取用户的信息
    _userAuthorized() {
        wx.getSetting({
            // 箭头函数不会改变 this
            success: (res) => {
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (res) => {
                            this.setData({
                                userInfo: res.userInfo,
                                authorized: true
                            })
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

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
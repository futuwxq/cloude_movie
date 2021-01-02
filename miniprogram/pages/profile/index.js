// pages/profile/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        collections: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.userAuthorized()

    },
    // 用户是否授权。授权之后获取用户的信息
    userAuthorized() {
        wx.getSetting({
            // 箭头函数不会改变 this
            success: (res) => {
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (res) => {
                            console.log(res)
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
    onGetInfo: function(event) {
        console.log(event)
        const { userInfo } = event.detail
        if (userInfo) {
            this.setData({
                userInfo,
                authorized: true
            })
        }
    },
    /**
     * 进入关于页面
     */
    onAbout() {
        // console.log(e);
        wx.navigateTo({
            url: '/pages/about/index'
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
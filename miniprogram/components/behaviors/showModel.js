module.exports = Behavior({
    data: {
        modalShow: false,
        isLoadData: false
    },
    methods: {

        /**
         * 显示授权状态框
         */
        OnLogin() {
            // 弹出授权框 
            // console.log("OnLogin");
            this._showModel()

        },
        /**
         * 登录成功
         */
        LoginSuccess() {
            // 收起登录框
            this.setData({
                modalShow: false,
                isLoadData: true
            })

        },
        /**
         * 授权失败
         */
        LoginFail() {
            // 收起登录框
            this.setData({
                modalShow: false
            })
            wx.showToast({
                title: '未授权无法收藏影片',
                icon: 'none'
            })
        },
        _isModalShow() {
            // 判断用户授权是否弹出授权框
            wx.getSetting({
                success: (res) => {
                    console.log(res)
                    if (!res.authSetting['scope.userInfo']) {
                        this.setData({
                            modalShow: false,
                        })
                    }
                }
            })
        },
        _showModel() {
            this.setData({
                modalShow: true
            })

        }
    }


})
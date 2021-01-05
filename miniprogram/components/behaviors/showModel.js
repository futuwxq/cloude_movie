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
            this.buildCollect()
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
        /**
         * 上传用户喜欢的状态和数量
         */
        postLike(id, like, count) {
            // 更新数据库
            wx.cloud.callFunction({
                // 云函数名称
                name: 'updateMovieLike',
                // 传给云函数的参数 
                data: {
                    count,
                    like,
                    id
                }
            }).then((res) => {
                console.log(res)
            })
        },
        /**
         * 上传用户喜欢的电影
         */
        postCollect(like, id) {
            //  推荐电影的 id 都是 4位数
            this.updateCollect(like, id)

        },
        /**
         * 
         * @param {*} like 
         * @param {*} id 
         * 更新推荐电影的喜欢状态
         */
        // updateRecomCollect(like, id) {
        //     console.log("updateRecomCollect");
        //     wx.cloud.callFunction({
        //         name: 'updateRecomCollect',
        //         data: {
        //             like,
        //             id,
        //         }
        //     }).then((res) => {
        //         console.log(res)
        //     })

        // },
        /**
         * 
         * @param {*} like 
         * @param {*} id 
         * 更新其他电影的喜欢状态
         */
        updateCollect(like, id) {
            console.log("updateCollectMovie");
            wx.cloud.callFunction({
                name: 'updateCollectMovie',
                data: {
                    like,
                    id,
                }
            }).then((res) => {
                console.log(res)
            })
        },
        /**
         * 
         * 新建用户收藏表
         */
        buildCollect() {
            wx.cloud.callFunction({
                name: 'initCollectMovie',
            }).then((res) => {
                console.log(res)
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
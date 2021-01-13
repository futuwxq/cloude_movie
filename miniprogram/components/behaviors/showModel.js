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

            // 创建收藏表
            // this.buildCollect()
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
         * 上传用户喜欢的数量
         */
        postLike(id, count) {
            // 更新数据库
            wx.cloud.callFunction({
                // 云函数名称
                name: 'updateMovieLikeCount',
                // 传给云函数的参数 
                data: {
                    count,
                    // like,
                    id
                }
            }).then((res) => {
                // console.log(res)
            })
        },
        /**
         * 上传用户喜欢的电影
         */
        // postCollect(like, id) {
        //     //  推荐电影的 id 都是 4位数
        //     this.updateCollect(like, id)

        // },
        /**
         * 
         * @param {*} like 
         * @param {*} id 
         * 更新用户收藏表的信息,同时也是对用户收藏状态的更新
         */
        updateCollect(like, id) {
            if (like) this.addCollect(id)
            else this.removeCollect(id)

        },
        /**
         * 增加收藏电影
         */
        addCollect(id) {
            console.log('addCollect');

            wx.cloud.callFunction({
                name: 'addCollect',
                data: {
                    id,
                    _date: new Date(),
                }
            }).then((res) => {
                console.log(res)
            })
        },
        /**
         * 删除收藏电影
         */
        removeCollect(id) {
            console.log('removeCollect');
            wx.cloud.callFunction({
                name: 'removeCollect',
                data: {
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
        // buildCollect() {
        //     wx.cloud.callFunction({
        //         name: 'initCollectMovie',
        //     }).then((res) => {
        //         console.log(res)
        //     })
        // },
        _isModalShow() {
            // 判断用户授权是否弹出授权框
            wx.getSetting({
                success: (res) => {
                    // console.log(res)
                    if (!res.authSetting['scope.userInfo']) {
                        this._offModel()
                    }
                }
            })
        },
        /**
         * 显示授权按钮
         */
        _showModel() {
            this.setData({
                modalShow: true
            })

        },
        /**
         * 关闭授权按钮
         */
        _offModel() {
            this.setData({
                modalShow: true
            })

        }
    }


})
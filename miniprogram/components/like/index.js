// components/like/index.js
// import { UserAuthorizedModel } from "../../models/userAuthorized"

// const userAuthorizedModel = new UserAuthorizedModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean,
        },
        count: {
            type: Number,
        },
        readOnly: {
            type: Boolean,
            value: false
        },
        isLoadData: Boolean
    },
    observers: {
        isLoadData: function(isLoadData) {
            if (isLoadData) this.postLikeData()
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // like and  unlike icon path
        yesSrc: 'images/like_o.png',
        noSrc: 'images/like.png',
        // authorized: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(event) {
            if (this.properties.readOnly) {
                return
            }
            this.getUserAuthorized()
        },
        /**
         * 用户点击收藏组件
         * 1.判断用户是否授权
         *  1.1 未授权向 movie 组件发起事件
         *  1.2 已经授权 调用上传数据函数
         */
        getSetting() {
            return new Promise((resolve, reject) => {
                wx.getSetting({
                    success: (res) => {
                        resolve(res.authSetting)
                    },
                    fail: (res) => {
                        reject(res)

                    }

                })
            })
        },
        async getUserAuthorized() {
            const setting = await this.getSetting()
            if (setting['scope.userInfo']) {
                console.log("已经授权");
                this.postLikeData()
            } else {
                //未授权 需要弹起登录框
                this.triggerEvent('onLogin', {}, {})
            }
        },
        /**
         * 上传like状态和数量
         */
        postLikeData() {
            let like = this.properties.like
            let count = this.properties.count
            count = like ? count - 1 : count + 1
            this.setData({
                    count,
                    like: !like
                })
                // 自定义事件
            this.triggerEvent('postLike', {
                like: !like,
                count
            }, {});
            this.onShowToast()

        },
        /**
         * toast 提示信息
         */
        onShowToast() {
            if (this.data.like) {
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
        }
    }
})
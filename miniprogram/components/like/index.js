// components/like/index.js
import { UserAuthorizedModel } from "../../models/userAuthorized"

const userAuthorizedModel = new UserAuthorizedModel()
    // const app = getApp(); //写在页面顶部page()外

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
        isAuthorized: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(event) {
            if (this.properties.readOnly) {
                return
            }
            if (this.data.isAuthorized) {
                // 已经授权了
                this.postLikeData()
            } else {
                // 还未授权
                this._getUserAuthorized()
            }

            // app.globalData.collectChange = true
        },
        /**
         * 用户点击收藏组件
         * 1.判断用户是否授权
         *  1.1 未授权向 movie 组件发起事件
         *  1.2 已经授权 调用上传数据函数
         */

        _getUserAuthorized() {
            userAuthorizedModel.userAuthorized().then(res => {

                    if (res) {
                        this.postLikeData()
                        this.setData({
                            isAuthorized: true
                        })

                    } else {
                        //未授权 需要弹起登录框
                        this.triggerEvent('onLogin', {}, {})
                    }
                })
                // const setting = await this.getSetting()
                // if (setting['scope.userInfo']) {
                //     // console.log("已经授权");
                //     console.log('click');
                //     this.postLikeData()
                // } else {
                //     //未授权 需要弹起登录框
                //     this.triggerEvent('onLogin', {}, {})
                // }
        },
        // getSetting() {
        //     return new Promise((resolve, reject) => {
        //         wx.getSetting({
        //             success: (res) => {
        //                 resolve(res.authSetting)
        //             },
        //             fail: (res) => {
        //                 reject(res)

        //             }

        //         })
        //     })
        // },
        /**
         * 上传like数量
         */
        postLikeData() {
            const like = this.properties.like
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
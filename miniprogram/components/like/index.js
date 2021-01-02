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
        }
        // dataId: {
        //     type: String,
        // },
        // postFunction: {
        //     type: String
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // like and  unlike icon path
        yesSrc: 'images/like_o.png',
        noSrc: 'images/like.png',
        authorized: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getUserAuthorized() {

            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        this.setData({
                            authorized: true
                        })
                    } else {
                        // 需要弹起登录框
                        this.triggerEvent('onAuthoried', {}, {})
                    }
                }
            })

            // 检查用户是否授权
            // console.log(UserAuthorizedModel.getUserAuthorized());
            // if (UserAuthorizedModel.getUserAuthorized()) {
            //     this.setData({
            //         authorized: true
            //     })
            // } else {
            //     // 需要弹起登录框
            //     this.triggerEvent('onAuthoried', {}, {})
            // }
        },
        onLike: function(event) {
            this.getUserAuthorized()

            // 自定义事件
            if (this.properties.readOnly || !this.data.authorized) {
                return
            }
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
            if (!like) {
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
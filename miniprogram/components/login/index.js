// components/author-button/index.js
import { UserAuthorizedModel } from '../../models/userAuthorized';
const userAuthorizedModel = new UserAuthorizedModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modalShow: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfor(event) {
            const userInfo = event.detail.userInfo
                // 允许授权
            if (userInfo) {
                const nickName = userInfo.nickName
                this.triggerEvent('loginsuccess', userInfo, {})
                    // 上传用户的信息 
                userAuthorizedModel.saveUser(nickName)
            } else {
                this.triggerEvent('loginfail', {}, {})
            }
        },
        /**
         * 取消授权，关闭授权框的效果和授权失败效果一致
         */
        cancleLogin() {
            this.triggerEvent('loginfail', {}, {})
        }
    }
})
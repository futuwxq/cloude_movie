// components/author-button/index.js
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
                this.triggerEvent('loginsuccess', userInfo, {})
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
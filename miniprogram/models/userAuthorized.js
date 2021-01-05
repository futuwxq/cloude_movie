class UserAuthorizedModel {
    /**
     * 用户登录后，保存用户信息
     */
    saveUser(nickName) {
        const registerdate = new Date()
        wx.cloud.callFunction({
            name: 'addUser',
            data: {
                nickName,
                registerdate
            }
        }).then(res => {
            // console.log(res);
        })
    }

    /**
     * 用户是否注册
     */
    async userAuthorized() {
        const res = await wx.getSetting()
        if (res.authSetting['scope.userInfo'])
            return true
        else return false
    }

    /**
     * 获取用户信息
     */
    async getUserInfor() {
            const res = await wx.getUserInfo()
            return res.userInfo
        }
        /**
         * 用户是否已经注册
         */
    async getUser() {

            const res = await wx.cloud.callFunction({
                name: 'getUserById'
            })

            if (res.result.data.length === 0) {
                return true
            } else {
                return false
            }
        }
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
    }
}

export { UserAuthorizedModel }
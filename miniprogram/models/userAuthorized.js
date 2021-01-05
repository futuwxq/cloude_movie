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
}

export { UserAuthorizedModel }
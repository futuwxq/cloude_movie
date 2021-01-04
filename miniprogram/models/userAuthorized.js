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
            console.log(res);
        })
    }
}

export { UserAuthorizedModel }
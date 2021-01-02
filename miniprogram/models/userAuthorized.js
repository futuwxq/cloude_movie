class UserAuthorizedModel {
    // 检查用户是否授权
    getUserAuthorized() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    return true

                } else {
                    return false
                }
            }
        })
    }
}

export { UserAuthorizedModel }
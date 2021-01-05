class MovieModel {
    collections = []
    maxCOUNT = 6
        /**
         * 获取电影收藏夹
         */
    async getCollection(index = 1) {
            const res = await wx.cloud.callFunction({
                    name: 'getCollection'
                })
                // console.log("getCollection")
                // const result = res.result.list[0]
                // if (result.length > count) {
                //     return result.slice(0, result.length)
                // }
                // console.log(index);
            const result = res.result.list[0]
                // console.log(result);
            this.collections = [...result.infor]
            if (this.collections.length > index * this.maxCOUNT) {
                return this.collections.slice(0, this.maxCOUNT * index)

            }
            return this.collections

        }
        /**
         * 
         * @param {*} index 
         * 是否需要再加载数据
         */
    getCollectionLen(index = 1) {
        return this.collections.length > index * this.maxCOUNT
    }

}

export {
    MovieModel
}
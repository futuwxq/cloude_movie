class MovieModel {
    collections = []
    maxCOUNT = 6
    like_statu = false
        /**
         * 获取电影收藏夹
         */
    async getCollection(index = 1) {
            const res = await wx.cloud.callFunction({
                    name: 'getCollection'
                })
                // console.log(res);
                // console.log("getCollection")
                // const result = res.result.list[0]
                // if (result.length > count) {
                //     return result.slice(0, result.length)
                // }
                // console.log(index);
                // const result = res.result.list
            // console.log(res);
            this.collections = res.result.list
            const count = this.collections.length
            // console.log(this.collections);
            if (count > index * this.maxCOUNT) {
                return this.collections.slice(0, this.maxCOUNT * index)

            }
            return {
                collection: this.collections,
                count,
            }

        }
        /**
         * 
         * @param {*} index 
         * 是否需要再加载数据
         */
    getCollectionLen(index = 1) {
            return this.collections.length > index * this.maxCOUNT
        }
        /**
         * 获取电影列表
         * 
         */
    async getMovieList(start) {
            const res = await wx.cloud.callFunction({
                name: 'getMovieList',
                data: {
                    start,
                }
            })
            // console.log(res);
            const result = res.result.data
                // result.forEach(element => {
                //     if (element.infor.length === 0) {
                //         element['like_statu'] = false

            //     } else {
            //         element['like_statu'] = true
            //     }
            // });
            return result
        }
        /**
         * 获取海报电影数据
         * @param {*} start 
         */
    async getOneMovie(start) {
            const res = await wx.cloud.callFunction({
                name: 'getRecommendMovie',
            })
            // console.log(res);
            const result = res.result.list
            result.forEach(element => {
                if (element.infor.length === 0) {
                    element['like_statu'] = false
                } else {
                    element['like_statu'] = true
                }
            });
            return result
        }
        /**
         * 通过 id 查看影片是否收藏
         */
    async iscollectByID(id) {
            const res = await wx.cloud.callFunction({
                name: 'getLikeById',
                data: {
                    id,
                }
            })
            const result = res.result.data
            // console.log(res);
            if (result.length === 0)
                return false
            else return true
        }
        /**
         * 通过 id 获取电影详情
         */
    async getMovieById(id) {
        const res = await wx.cloud.callFunction({
            name: 'getMovieById',
            data: {
                id,
            }
        })

        return res.result.data[0]
    }

}

export {
    MovieModel
}
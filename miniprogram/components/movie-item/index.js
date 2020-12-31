// components/movie-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        movieitem: {
            type: Object
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onMovieDetail(e) {
            const id = this.properties.movieitem.id
            wx.navigateTo({
                url: `/pages/movie-detail/index?id=${id}`
            })
        }
    }
})
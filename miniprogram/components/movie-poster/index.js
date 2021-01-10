// components/movie/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        goToDetail(e) {
            const { id } = e.currentTarget.dataset
            wx.navigateTo({
                url: `/pages/movie-detail/index?id=${id}`
            })
        }
    }
})
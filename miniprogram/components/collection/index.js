// components/collection/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        infor: Object
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
        toDetail() {
            const id = this.properties.infor.id
            wx.navigateTo({
                url: `/pages/movie-detail/index?id=${id}`
            })
        }
    }
})
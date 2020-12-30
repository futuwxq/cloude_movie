// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean,
        },
        count: {
            type: Number,
        },
        readOnly: {
            type: Boolean,
            value: false
        }
        // dataId: {
        //     type: String,
        // },
        // postFunction: {
        //     type: String
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // like and  unlike icon path
        yesSrc: 'images/like_o.png',
        noSrc: 'images/like.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function(event) {
            // 自定义事件
            if (this.properties.readOnly) {
                return
            }
            let like = this.properties.like
                // console.log(like)
            let count = this.properties.count
            count = like ? count - 1 : count + 1
            this.setData({
                    count,
                    like: !like
                })
                // 自定义事件
            this.triggerEvent('postLike', {
                like: !like,
                count
            }, {});
            // console.log(this.properties.postFunction)
            // //  更新数据库
            // wx.cloud.callFunction({
            //     // 云函数名称
            //     // name: "updatePosterCollect",
            //     name: this.properties.postFunction,
            //     // 传给云函数的参数 
            //     data: {
            //         // 这里需要传入的是改变之后的 properties 里面的值,count 和 index 是暂存值
            //         // count,
            //         // like,
            //         // count: this.properties.count,
            //         // like: this.properties.like,
            //         count,
            //         like:!like,
            //         id: this.properties.dataId
            //         // id:"1"
            //     }
            // }).then((res) => {
            //     console.log(res)
            // })
        }
    }
})
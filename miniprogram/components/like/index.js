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
        },
        id:{
            type:Number,
            value:1
        }
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
            console.log(like)
            let count = this.properties.count
            let id =  this.properties.id
            count = like ? count - 1 : count + 1
            this.setData({
                count,
                like: !like
            })
            console.log(this.properties.like)
            //  更新数据库
            wx.cloud.callFunction({
                // 云函数名称
                name: 'updateMovieLike',
                // 传给云函数的参数 
                data: {
                    // 这里需要传入的是改变之后的 properties 里面的值,count 和 index 是暂存值
                    // count,
                    // like,
                  count:this.properties.count,
                  like:this.properties.like,
                  id
                }
              }).then((res) => {
                console.log(res)
                console.log(this.properties)
              })
        }
    }
})
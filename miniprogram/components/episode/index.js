// components/episode/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        months: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
            '十二月'
        ],
        year: 0,
        _index: 0,
        day: '',
        month: ''
    },

    attached: function() {
        // 在组件实例进入页面节点树时执行
        const myDate = new Date()
        const year = myDate.getFullYear()
        const _index = myDate.getMonth()
        let day = myDate.getDate()

        this.setData({
            year,
            day: day < 10 ? '0' + day : day.toString(),
            month: this.data.months[_index]
        })
    },


    /**
     * 组件的方法列表
     */
    methods: {

    }
})
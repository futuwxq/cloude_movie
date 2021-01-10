// components / search - by - tag / index.js
import {
    HistorywordModel
} from "../../models/historyword.js"
const historywordModel = new HistorywordModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: Boolean,
            observers: function() {
                console.log(1);
            }
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        searchText: '',
        researchRes: [],
        isShowResult: false,
        historyword: [],
        noResult: false
    },
    // observers: {
    //     'more': function(more) {
    //         console.log(more);
    //     }
    // },

    attached: function() {
        // 在组件实例进入页面节点树时执行
        this.setData({
            historyword: historywordModel.getHistory()
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击确定按钮，进行搜索
        onSearching: function(e) {
            // console.log(e.detail.tags)
            // 当输入框有值的时候开始检索
            // console.log(e);
            const keywords = e.detail.value || e.target.dataset.title
            if (keywords) {
                // 获取推荐页的数据              
                wx.cloud.callFunction({
                        name: '      ',
                        data: {
                            title: keywords
                        }
                    }).then((res) => {
                        const result = res.result.data;
                        this.setData({
                            noResult: result.length === 0 ? true : false,
                            researchRes: result,
                            isShowResult: true,
                            searchText: keywords,

                        })
                    })
                    // 存入历史搜索
                historywordModel.setHistory(keywords)

            } else {
                wx.showToast({
                    title: '电影名不能为空:-O',
                    icon: 'none',
                    duration: 2000
                })
            }

        },
        // 点击删除图标，清除输入框的文本
        delateValue() {
            console.log("删除")
            this.setData({
                searchText: '',
                isShowResult: false,
                noResult: false
            })
        },
        // 点击取消，返回搜索界面
        cancleSearching() {
            console.log("取消")
            this.triggerEvent('onCancling', {}, {})
                // this.setData({
                //   // searchText: '',
                //   // isShowResult:false
                // })
        }
    }
})
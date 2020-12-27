// components/search-by-tag/index.js
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
    searchText: '',
    researchRes:[],
    isShowResult:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击确定按钮，进行搜索
    onSearching: function (e) {
      // console.log(e.detail.value)
      // 当输入框有值的时候开始检索
      if (e.detail.value) {
        // 获取推荐页的数据
        let title = e.detail.value
        wx.cloud.callFunction({
          name: 'getMovieByName',
          data: {
            title
          }
        }).then((res) => {
          console.log(res.result.data[0])
          this.setData({
            researchRes: res.result.data,
            isShowResult:true
          })
        })
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
        isShowResult:false
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

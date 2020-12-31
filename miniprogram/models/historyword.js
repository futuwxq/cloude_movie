class HistorywordModel {
    key = 'h'
    maxLength = 10
    getHistory() {
        const words = wx.getStorageSync(this.key)
        return words ? words : []

    }

    setHistory(keyword) {
        // 队列 栈
        let words = this.getHistory()
        const has = words.includes(keyword)
        if (!has) {
            // 如果历史文字超过 10 个，删除尾巴的元素
            if (words.length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
                // console.log(this.key);
            wx.setStorageSync(this.key, words)

        }
    }
}

export { HistorywordModel }
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
    // 云函数入口函数
exports.main = async(event, context) => {
    const start = event.start
    // return db.collection('movielist').skip(0).limit(20).aggregate().lookup({
        return db.collection('movielist').aggregate().lookup({
        from:'collectmovie',
        localField:'id',
        foreignField:'movieid',
        as:'infor',
    }).skip(0).limit(20).end()
    
}
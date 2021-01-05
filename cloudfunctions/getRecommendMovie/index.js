// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
// return  db.collection('onemovie').get()
return  db.collection('onemovie').aggregate().lookup({
        from:'movielist',
        localField:'id',
        foreignField:'id',
        as:'infor',
      }).project({
        _id:0,
        poster:1,
        id:1,
        quotations:1,
        'infor.like':1,

      }).end()
}
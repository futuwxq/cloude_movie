// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection('movielist').aggregate().lookup({
    from:'collectmovie',
    localField:'id',
    foreignField:'movieid',
    as:'infor',
}).match({
  'infor.openid':wxContext.OPENID,
  }).project({
       title:1,
        id:1,
       cover:1,
  }).end()
}
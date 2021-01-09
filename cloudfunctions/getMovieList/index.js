// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate
    // 云函数入口函数
exports.main = async(event, context) => {
    const start = event.start
  const wxContext = cloud.getWXContext()
  return  db.collection('movielist').skip(start).limit(20).field({
    rate: true,
    title: true,
    cover: true,
    id: true,
  }).get()
//   return db.collection('movielist').aggregate().lookup({
//     from:'collectmovie',
//     let:{
//         movielist_id:'$id',
//     },
//     pipeline:$.pipeline()
//         .match(_.expr($.and([
//             $.eq(['$movieid','$movielist_id']),
//             $.eq(['$openid','132456'])
//         ])))
//         .done(),
//     as:'infor',
//   }).end()


//         return db.collection('movielist').aggregate().lookup({
//         from:'collectmovie',
//         localField:'id',
//         foreignField:'movieid',
//         as:'infor',
//     }).match({
//         // openid:wxContext.OPENID,
//         'infor.openid':'oZzl65DJ5sSsrXqYnE_oU8CKUdH4',
//       }).project({
//         title:1,
//          id:1,
//         cover:1,
//    }).end()
    // .skip(0).limit(20).end()
    
}
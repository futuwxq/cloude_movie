// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const title = event.title 
  const wxContext = cloud.getWXContext()
   return db.collection('collectmovie').where({
    // openid:wxContext.OPENID,
    openid:'132456',
   }).where({
    //  movieid:movie_id,
    title:'129272',
   }).get()
}

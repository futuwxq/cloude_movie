// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const like = event.like
  // const like = false
  // const  movieid = "1001"
  const  movie_id = event.id 
  // if(like) {
    return db.collection('collectmovie').add({
      data:{
        openid:wxContext.OPENID,
        movieid:movie_id,
        _data:new Date()
      }
    })
    // return db.collection('collectmovie').where({
    //     openid:wxContext.OPENID
    // }).update({
    //   data:{
    //     movieid:_.push([movie_id])
    //   }
    // })
  // } else 
  // {
  //   return db.collection('collectmovie').where({
  //     movieid:movie_id,
  //   }).remove()
  // }

}

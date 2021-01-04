// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const like = event.like
  const  movie_id = event.id 

  if(like) {
    return db.collection('collectmovie').where({
        openid:wxContext.OPENID
    }).update({
      data:{
        recomovieid:_.push([movie_id])
      }
    })
  } else 
  {
    return db.collection('collectmovie').where({
        openid:wxContext.OPENID
    }).update({
      data:{
        recomovieid:_.pull(_.in([movie_id]))
      }
    })
  }

}
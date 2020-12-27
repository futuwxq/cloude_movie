// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let movie_name = event.title
  return db.collection('movielist').where(
    {
      title:movie_name 
      // id:"1292064"
    }
  ).get()
}
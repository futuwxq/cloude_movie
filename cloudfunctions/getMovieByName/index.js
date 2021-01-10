// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  let movie_name = event.title
  return db.collection('movielist').where(
    {
      title: db.RegExp({
        regexp: '.*' +movie_name +  '.*' ,
        options: 'i',
      })
      // id:"1292064"
    }
  ).get()
}
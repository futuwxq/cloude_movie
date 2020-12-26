// 云函数入口文件
const cloud = require('wx-server-sdk')
 
cloud.init()
 
const db = cloud.database()

 
// 云函数入口函数
exports.main = async (event, context) => {
  let like = event.like
  let count = event.count
  let id = event.id
  try {
    return await db.collection('onemovie')
    .where({
      id:id
    }).update({
      // data 传入需要局部更新的数据
      data: {
        like,
        count
      }
    })
  } catch (e) {
    console.error(e)
  }
}

// 云函数入口文件
const cloud = require('wx-server-sdk')
 
cloud.init()
 
const db = cloud.database()

 
// 云函数入口函数
exports.main = async (event, context) => {
  const count = event.count
  const id = event.id
  try {
    return await db.collection('movielist')
    .where({
      id:id
    }).update({
      // data 传入需要局部更新的数据
      data: {
        like_count:count,
        // 'like.like_statu':like
      }
    })
  } catch (e) {
    console.error(e)
  }
}

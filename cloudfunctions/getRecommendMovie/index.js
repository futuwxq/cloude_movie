// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 return  db.collection('onemovie').get()
//  db.collection('onemovie').get().then(res => {
//     // res.data 包含该记录的数据
//     console.log(res)
//     return res.result.data
//   })

}
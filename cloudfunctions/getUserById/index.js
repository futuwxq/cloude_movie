// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext.OPENID)
  return db.collection('user').where({
    // openid:"oZzl65DJ5sSsrXqYnE_oU8CKUdH4",
    openid:wxContext.OPENID,
}).get()
}
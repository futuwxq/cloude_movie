// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const nackname = event.nickName
  const registerdate = event.registerdate
  console.log(wxContext.OPENID)
  return db.collection('user').add({
    data:{
      openid:wxContext.OPENID,
      nackname,
      registerdate,
    }
  })
}
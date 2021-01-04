// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
    return db.collection('collectmovie').aggregate()
      .lookup({
        from:'movielist',
        localField:'movieid',
        foreignField:'id',
        as:'infor',
      })
      .lookup({
        from:'onemovie',
        localField:'recomovieid',
        foreignField:'id',
        as:'reinfor',
      })
      .project({
        movieid:0,
        openid:0,
        recomovied:0,
        _id:0,
        'infor._id':0,
        'infor.url':0,
        'infor.director':0,
        'infor.intro':0,
        'infor.starring':0,
        'infor.genre':0,
        'infor.country':0,
        'infor.runtime':0,
        'infor.rate':0,
        'infor.release_date':0,
        'reinfor.quotations':0,
        'reinfor.poster':0,
        'reinfor.rate':0,
        'reinfor._id':0,
        'reinfor.like':0,
      })
      .end()

      // db.collection('collectmovie').aggregate()

      // .project({
      //   'infor._id':0,
      //   'infor.url':0,
      //   'infor.director':0,
      //   'infor.intro':0,
      //   'infor.starring':0,
      //   'infor.genre':0,
      //   'infor.country':0,
      //   'infor.runtime':0,
      //   'infor.release_date':0,
      // })
      // .end()
}
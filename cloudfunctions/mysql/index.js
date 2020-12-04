const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event);
  //链接mysql数据库的xiushi库，这里你可以链接你mysql中的任意库
  try {
    const connection = await mysql.createConnection({
      host: event.server,
      database: event.basename,
      user: event.user,
      password: event.pwd
    })
    const [rows, fields] = await connection.execute(event.sql)
    return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }


  

}
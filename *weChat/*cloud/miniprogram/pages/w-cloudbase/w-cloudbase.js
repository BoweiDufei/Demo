// miniprogram/pages/w-cloudbase/w-cloudbase.js

// 获取统一数据库
const db = wx.cloud.database();
const collection = db.collection("students");

Page({
  /**
   * 增加一条数据到数据库中
   */
  addDataToDB:async function(){
    const result = await collection.add({
      data:{
        name: "飞翔",
        age: 18,
        course: "计算机科学与技术",
        height: 1.98,
        location:db.Geo.Point(100, 50),
        birthrday: new Date("1988-10-10")
      },
    });
    console.log(result);
  },

  /**
   * 删除数据库中的某条数据
   */
  removeDataToDB:async function(){
    const result = await collection.doc('baada3ac5ed3bc8d001b496c7e8adc5f').remove()
    // const result = await collection.where({'_id':'38d78ca75ed3bdbe0018470978f0a0a8'}).remove(); // 不允许多个删除，需要使用云函数
    console.log(result)
  },

  /**
   * 修改数据库中的一条数据
   */
  updateDataToDB:async function(){
    const result = await collection.doc('4c5846c75ed3bdbf0016da49496f2263').update({
      data:{
        age:100
      }
    });
    console.log(result)
  },

  /**
   * 查找数据库中的某一条数据
   */
  queryDataToDB:async function(){
    const result = await collection.where({
      _id:'4c5846c75ed3bdbf0016da49496f2263'
    }).get();
    console.log(result)
  },
})
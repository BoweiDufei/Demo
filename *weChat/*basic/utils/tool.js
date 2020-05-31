
/**获取用户信息
 * 
 * const tool = require('../../utils/tool.js')
 * viewClickMethod: async function() {
 *   const info = await tool.getUserinfo();
 * }
 * (注意:微信小程序中的async 写在function前面)
 */
const getUserinfo = function() {
  return new Promise((resolve, reject) => { 
    wx.getUserInfo({
      complete: (res) => {
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      },
    })
  });
}

module.exports = {
  getUserinfo
}
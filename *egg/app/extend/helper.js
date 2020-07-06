'use strict';

const moment = require('moment');
const sd = require('silly-datetime');
const fs = require('fs');
const request = require('request');

exports.formatTime = time => moment(time).formate('YYYY-MM-DD HH:mm:ss');

const success = (ctx, res, msg = '请求成功') => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};
const fail = (ctx, res, msg = '请求失败') => {
  ctx.body = {
    code: 404,
    data: res,
    msg,
  };
  ctx.status = 404;
};

/** 下载图片 */
const easyDownImage = (uri, targetPath) => {
  return new Promise((resolve, reject) => {
    const src = uri + '';
    const writeStream = fs.createWriteStream(targetPath);
    const readStream = request(src);
    readStream.pipe(writeStream);
    readStream.on('end', function() {
      console.log('文件下载成功');
    });
    readStream.on('error', function(err) {
      console.log('错误信息:' + err);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false);
    });
    writeStream.on('finish', function() {
      resolve(true);
      writeStream.end();
    });
  });
};

/**
 * 递归删除方法
 */
const deleteDir = path => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      console.log(index);
      const curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
};


const getObjectId = function (idStr) {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId(idStr);
};

// 将某方法promise化
const promisify = function (nodeFunction) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      nodeFunction.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};

const md5 = content => {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(content).digest('hex');
};

// 13位的时间戳，10位的要*1000
const formateTime = params => {
  return sd.format(new Date(params), 'YYY-MM-DD HH:mm');
};

// https://blog.csdn.net/weidfyr/article/details/48209537

// const fs = require('fs');
const util = require('util');

/**
 * 一般封装工具
 * 判断某元素是否是数组 - isArray(object)
 * 判断某元素是否是字典 - isMap(object)
 * 判断某元素是否是boolean值 - isBoolean(object)
 * 判断某元素是否是Date - isDate(object)
 * 判断某元素是否是error - isError(object)
 * 判断某元素是否是function - isFunction(object)
 * 判断某元素是否是null - isNull(object)
 * 判断某元素是否是null或者undefined - isNullOrUndefined(object)
 * 判断某元素是否是数字 - isNumber(object)
 * 判断某元素是否是对象 - isObject(object)
 * 判断某元素是否是字符串 - isString(object)
 * 判断某元素是否是电话号码 - isMobileNumber(object)
 * 判断某元素是否是邮箱 - isEmail(object)
 * 判断是否是闰年 - isLeapYear(object)
 * 判断是否是一个网址 - isVailAddress(object)
 * 判断字符串中是否包含中文 - isHaveChineseWord(object)
 * 将字符串转utf8 - utf8(object)
 * 将utf8字符串反编码 - deUtf8(object)
 * 去除左右空格 - trim(object)
 * 去除左侧空格 - ltrim(object)
 * 去除右侧侧空格 - rtrim(object)
 * 一个数组 额外添加 另外一个数组 - list_addObjectsFromArray(fromList,otherList)
 * 拼接字符串数组为字符串 - list_componentsJoinedByString(fromList,middleStr)
 * 在数组最后扩展一个元素 - list_addObject(fromList,element)
 * 移除最后一个元素 - list_removeLastObject(fromList)
 * 移除第几个元素 - list_removeObjectAtIndex(fromList,index)
 * 插入元素 - list_insertObjectAtIndex(fromList,obj,index)
 * 更换数组某元素 - list_replaceObjectAtIndex(fromList,obj,index)
 * 设置某位置元素 - list_setObjectAtIndex(fromList,index,obj)
 * 两个元素调换位置 - list_exchangeObjectAtIndexWithIndex(fromList,aIndex,bIndex)
 * 是否包含某元素 - list_containsObject(fromList,obj)
 * 数组中元素的位置 - list_indexOfObject(fromList,obj)
 * 移除数组中某范围的元素 - list_removeObjectsInRange(fromList,start,to)
 * 删除某数组中存在的数组元素 - list_removeObjectsInArray(fromList,otherList)
 * 删除重复元素 - list_removeRepeatElement(fromList,element)
 * 获取第几个元素 - list_objectAtIndex(fromList,index)
 * 获取最后一个元素 - list_lastObject(fromList)
 * 获取第一个元素 - list_firstObject(fromList)
 * 深拷贝新创建一个一模一样的元素 - dbw_deepCopy(obj)
 * 数组降序（使用了深拷贝，原来的数据不会被改变） - list_getDescList(fromList)
 * 数组升序（使用了深拷贝，原来的数据不会被改变） - list_getAscList(fromList)
 * 扩展另外一个字典的方法 - map_addEntriesFromDictionary(fromDict,toDict)
 * 获取字典所有key值组成的数组 - map_allKeys(fromDict)
 * 获取字典所有value值组成的数组 - map_allValues(fromDict)
 * 移除字典中某个key对应的value - map_removeObjectForKey(fromDict,keyStr)
 * 移除字典中某个key数组对应的value - map_removeObjectForKeys(fromDict,removeKeys)
 */
const dbw_util = {
  isArray(object) {
    return Array.isArray(object);
  },
  isMap(object) {
    return util.types.isMap(object);
  },
  isBoolean(object) {
    return typeof object === 'boolean';
  },
  isDate(object) {
    return util.types.isDate(object);
  },
  isError(object) {
    return util.types.isNativeError(object);
  },
  isFunction(object) {
    return typeof object === 'function';
  },
  isNull(object) {
    return object === null;
  },
  isNullOrUndefined(object) {
    return object === undefined || object === null;
  },
  isNumber(object) {
    return typeof object === 'number';
  },
  isObject(object) {
    return object !== null && typeof object === 'object';
  },
  isString(object) {
    return typeof object === 'string';
  },
  isMobileNumber(object) {
    const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(object);
  },
  isEmail(object) {
    const reg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    return reg.test(object);
  },
  isLeapYear(object) {
    // eslint-disable-next-line eqeqeq
    return (object % 4 == 0 && object % 100 != 0) || object % 400 == 0;
  },
  isVailAddress(object) {
    const reg = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
    return reg.test(object);
  },
  isHaveChineseWord(object) {
    const reg = /.*[\u4e00-\u9fa5]+.*$/;
    return reg.test(object);
  },
  utf8(object) {
    return encodeURI(object);
  },
  deUtf8(object) {
    return decodeURI(object);
  },
  trim(object) {
    return object.trim();
  },
  ltrim(object) {
    return object.replace(/(^\s*)/g, '');
  },
  rtrim(object) {
    return object.replace(/(\s*$)/g, '');
  },

  // eslint-disable-next-line jsdoc/require-param
  /** 数组的操作 一个数组 额外添加 另外一个数组*/
  async list_addObjectsFromArray(fromList, otherList) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_addObjectsFromArray--error--${fromList}`);
        return;
      }
      if (!this.isArray(otherList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_addObjectsFromArray--error--${otherList}`);
        return;
      }
      suc(fromList.concat(otherList));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 拼接字符串数组为字符串 */
  async list_componentsJoinedByString(fromList, middleStr) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_componentsJoinedByString--error--${fromList}`);
        return;
      }
      if (!this.isString(middleStr)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_componentsJoinedByString--error--${middleStr}`);
        return;
      }
      suc(fromList.join(middleStr));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 在数组最后扩展一个元素 返回的是数组的长度，会对原来的数组进行改变*/
  async list_addObject(fromList, element) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_addObject--error--${fromList}`);
        return;
      }
      suc(fromList.push(element));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 移除最后一个元素 */
  async list_removeLastObject(fromList) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeLastObject--error--${fromList}`);
        return;
      }
      if (fromList.length === 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_removeLastObject--error--数组越界');
        return;
      }
      suc(fromList.pop());
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 移除第几个元素 */
  async list_removeObjectAtIndex(fromList, index) {
    await this.list_replaceObjectAtIndex(fromList, null, index);
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 插入元素 */
  async list_insertObjectAtIndex(fromList, obj, index) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_insertObjectAtIndex--error--${fromList}`);
        return;
      }
      if (index > fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_insertObjectAtIndex--error--数组越界');
        return;
      }
      if (index < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_insertObjectAtIndex--error--index<0');
        return;
      }
      if (this.isNull(obj)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_insertObjectAtIndex--error--null');
        return;
      }
      suc(fromList.splice(index, 0, obj));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 更换数组某元素 */
  async list_replaceObjectAtIndex(fromList, obj, index) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_replaceObjectAtIndex--error--${fromList}`);
        return;
      }
      if (index >= fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_replaceObjectAtIndex--error--数组越界');
        return;
      }
      if (index < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_replaceObjectAtIndex--error--index<0');
        return;
      }
      if (this.isNull(obj)) {
        // 如果元素是null，认为是删除某元素
        suc(fromList.splice(index, 1));
      } else {
        suc(fromList.splice(index, 1, obj));
      }
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 设置某位置元素
   * 其实与list_replace一致
  */
  async list_setObjectAtIndex(fromList, index, obj) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_setObjectAtIndex--error--${fromList}`);
        return;
      }
      if (!this.isNumber(index)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_setObjectAtIndex--error--index-type-error');
        return;
      }
      if (index >= fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_setObjectAtIndex--error--数组越界');
        return;
      }
      if (index < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_setObjectAtIndex--error--index<0');
        return;
      }
      suc(fromList.splice(index, 1, obj));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 两个元素调换位置 */
  async list_exchangeObjectAtIndexWithIndex(fromList, aIndex, bIndex) {
    return new Promise(async (suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_exchangeObjectAtIndexWithIndex--error--${fromList}`);
        return;
      }
      if (aIndex >= fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_exchangeObjectAtIndexWithIndex--error--数组越界');
        return;
      }
      if (aIndex < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_exchangeObjectAtIndexWithIndex--error--aIndex<0');
        return;
      }
      if (bIndex >= fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_exchangeObjectAtIndexWithIndex--error--数组越界');
        return;
      }
      if (bIndex < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_exchangeObjectAtIndexWithIndex--error--bIndex<0');
        return;
      }
      try {
        const aObj = await this.list_objectAtIndex(fromList, aIndex);
        const bObj = await this.list_objectAtIndex(fromList, bIndex);
        await this.list_replaceObjectAtIndex(fromList, bObj, aIndex);
        await this.list_replaceObjectAtIndex(fromList, aObj, bIndex);
        suc(fromList);
      } catch (error) {
        fail(error);
        return;
      }
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 是否包含某元素 */
  async list_containsObject(fromList, obj) {
    const index = await this.list_indexOfObject(fromList, obj);
    return index !== -1;
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 数组中元素的位置 */
  async list_indexOfObject(fromList, obj) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_indexOfObject--error--${fromList}`);
        return;
      }
      if (this.isNull(obj)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_indexOfObject--error--null');
        return;
      }
      suc(fromList.indexOf(obj));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 移除数组中某范围的元素 */
  async list_removeObjectsInRange(fromList, start, to) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeObjectsInRange--error--${fromList}`);
        return;
      }
      if (start >= to || start < 0 || to > fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_removeObjectsInRange--error--区域赋值错误');
        return;
      }
      suc(fromList.splice(start, (to - start)));
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 删除某数组中存在的数组元素 */
  async list_removeObjectsInArray(fromList, otherList) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeObjectsInArray--error--${fromList}`);
        return;
      }
      if (!this.isArray(otherList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeObjectsInArray--error--${otherList}`);
        return;
      }
      // 去重
      const noRepeatList = [];
      otherList.forEach(element => {
        const result = noRepeatList.includes(element);
        if (!result) {
          noRepeatList.push(element);
        }
      });
      noRepeatList.forEach(element => {
        this.list_removeRepeatElement(fromList, element);
      });
      suc(fromList);
    });
  },
  // 删除重复元素
  list_removeRepeatElement(fromList, element) {
    if (fromList.includes(element)) {
      const index = fromList.indexOf(element);
      fromList.splice(index, 1);
      if (fromList.includes(element)) {
        this.list_removeRepeatElement(fromList, element);
      }
    }
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 获取第几个元素 */
  async list_objectAtIndex(fromList, index) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_objectAtIndex--error--${fromList}`);
        return;
      }
      if (fromList.length === 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_objectAtIndex--error--length--${fromList}`);
        return;
      }
      if (!this.isNumber(index)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_objectAtIndex--error--index-type-error');
        return;
      }
      if (index >= fromList.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_objectAtIndex--error--数组越界');
        return;
      }
      if (index < 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail('--list_objectAtIndex--error--index<0');
        return;
      }
      suc(fromList[index]);
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 获取最后一个元素 */
  async list_lastObject(fromList) {
    return this.list_objectAtIndex(fromList, fromList.length - 1);
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 获取第一个元素 */
  async list_firstObject(fromList) {
    return this.list_objectAtIndex(fromList, 0);
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 深拷贝新创建一个一模一样的元素 */
  dbw_deepCopy(obj) {
    if (this.isArray(obj)) {
      // 数组
      const n = [];
      for (let i = 0; i < obj.length; i++) {
        n[i] = this.dbw_deepCopy(obj[i]);
      }
      return n;
    } else if (this.isObject(obj)) {
      // 对象
      const n = {};
      for (const i in obj) {
        n[i] = this.dbw_deepCopy(i);
      }
      return n;
    }
    return obj;
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 数组降序（使用了深拷贝，原来的数据不会被改变） */
  async list_getDescList(fromList) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_getDescList--error--${fromList}`);
        return;
      }
      const arrDescFunc = (a, b) => {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      };
      const otherList = this.dbw_deepCopy(fromList);
      otherList.sort(arrDescFunc);
      suc(otherList);
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 数组升序（使用了深拷贝，原来的数据不会被改变） */
  async list_getAscList(fromList) {
    return new Promise((suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_getDescList--error--${fromList}`);
        return;
      }
      const arrDescFunc = (a, b) => {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
        return 0;
      };
      const otherList = this.dbw_deepCopy(fromList);
      otherList.sort(arrDescFunc);
      suc(otherList);
    });
  },

  // eslint-disable-next-line jsdoc/require-param
  /** 数组去重 */
  async list_removeRepeat(fromList) {
    return new Promise(async (suc, fail) => {
      if (!this.isArray(fromList)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeRepeat--error--${fromList}`);
        return;
      }
      const map = {};
      for (let i = 0; i < fromList.length; i++) {
        const element = fromList[i];
        map[element] = i + '';
      }
      try {
        const keys = await this.map_allKeys(map);
        suc(keys);
      } catch (error) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--list_removeRepeat--error--${error}`);
      }
    });
  },

  // eslint-disable-next-line jsdoc/require-param
  /** 字典，扩展另外一个字典的方法 */
  async map_addEntriesFromDictionary(fromDict, toDict) {
    return new Promise((suc, fail) => {
      if (!this.isObject(fromDict) || !this.isObject(toDict)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_addEntriesFromDictionary--error--${fromDict}`);
        return;
      }
      for (const i in toDict) {
        fromDict[i] = toDict[i];
      }
      suc(fromDict);
    });
  },

  // eslint-disable-next-line jsdoc/require-param
  /** 字典 获取字典所有key值组成的数组 */
  async map_allKeys(fromDict) {
    return new Promise((suc, fail) => {
      if (!this.isObject(fromDict)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_allKeys--error--${fromDict}`);
        return;
      }
      const list = [];
      for (const i in fromDict) {
        list.push(i);
      }
      suc(list);
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 获取字典所有value值组成的数组 */
  async map_allValues(fromDict) {
    return new Promise((suc, fail) => {
      if (!this.isObject(fromDict)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_allValues--error--${fromDict}`);
        return;
      }
      const list = [];
      for (const i in fromDict) {
        list.push(fromDict[i]);
      }
      suc(list);
    });
  },

  // eslint-disable-next-line jsdoc/require-param
  /** 移除字典中某个key对应的value */
  async map_removeObjectForKey(fromDict, keyStr) {
    return new Promise(async (suc, fail) => {
      if (!this.isObject(fromDict)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_removeObjectForKey--error--${fromDict}`);
        return;
      }
      const allKeys = await this.map_allKeys(fromDict);
      if (allKeys.includes(keyStr)) {
        delete fromDict[keyStr];
      }
      suc(fromDict);
    });
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 移除字典中某个key数组对应的value */
  async map_removeObjectsForKeys(fromDict, removeKeys) {
    return new Promise(async (suc, fail) => {
      if (!this.isObject(fromDict)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_removeObjectsForKeys--error--${fromDict}`);
        return;
      }
      if (!this.isArray(removeKeys)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--map_removeObjectsForKeys--error--${removeKeys}`);
        return;
      }
      const allKeys = await this.map_allKeys(fromDict);
      for (let i = 0; i < removeKeys.length; i++) {
        const keyStr = removeKeys[i];
        if (allKeys.includes(keyStr)) {
          delete fromDict[keyStr];
        }
      }
      suc(fromDict);
    });
  },
};

/**
 * 网络操作相关方法，比如express
 */
const dbw_net = {

};

/**
 * 文件操作方法 fs
 * getfilesize - 转换文本大小 B 转 KB,MB,GB,TB
 */
const dbw_fs = {
  async getfilesize(fileSize) {
    return new Promise((suc, fail) => {
      if (!dbw_util.isNumber(fileSize)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        fail(`--getfilesize--error--${fileSize}`);
        return;
      }
      const num = 1024.00;
      let size = '';
      if (fileSize < num) {
        size = fileSize + 'B';
      } else if (fileSize < Math.pow(num, 2)) {
        size = (fileSize / num).toFixed(2) + 'K';
      } else if (fileSize < Math.pow(num, 3)) {
        size = (fileSize / Math.pow(num, 2)).toFixed(2) + 'M';
      } else if (fileSize < Math.pow(num, 4)) {
        size = (fileSize / Math.pow(num, 3)).toFixed(2) + 'G';
      } else {
        size = (fileSize / Math.pow(num, 4)).toFixed(2) + 'T';
      }
      suc(size);
    });
  },
};

/**
 * 时间操作方法 集合
 */
const dbw_time = {

};

/**
 * json解析相关
 * 将json字符串转换成json对象  - changeStrToObj:(json_str)
 * 将json对象转换成json对符串  - changeObjToStr:(json_model)
 * 将某种数据类型强行转换成String - changeDataToString:(json_data)
 * 将某种数据类型强行转换成Int，不存在返回NaN - changeDataToInt:(json_data)
 * 将某种数据类型强行转换成Float，不存在返回NaN - changeDataToFloat:(json_data)
 * 将某种数据类型强行转换成Boolean，不存在返回NaN - changeDataToBoolean:(json_data)
 * 获取一个随机整数，传入参数为随机上限 - getRandomIntNum(intNum)
 */
// eslint-disable-next-line jsdoc/require-param
const dbw_json = {
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将json字符串转换成json对象
   */
  changeStrToObj: json_str => {
    return JSON.parse(json_str);
  },
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将json对象转换成json对符串
   */
  changeObjToStr: json_model => {
    return JSON.stringify(json_model);
  },

  /** ************* 数据类型转换方面的操作 ****************/
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将某种数据类型强行转换成String，能转任何数据
   * 不再适用toString()
   */
  changeDataToString: json_data => {
    return String(json_data);
  },

  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将某种数据类型强行转换成Int，不存在返回NaN
   */
  changeDataToInt: json_data => {
    return parseInt(json_data);
  },
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将某种数据类型强行转换成Float，不存在返回NaN
   */
  changeDataToFloat: json_data => {
    return parseFloat(json_data);
  },
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 将某种数据类型强行转换成Boolean，不存在返回NaN
   */
  changeDataToBoolean: json_data => {
    return Boolean(json_data);
  },
  // eslint-disable-next-line jsdoc/require-param
  /** 获取一个随机整数，传入参数为随机上限 */
  getRandomIntNum(intNum) {
    return Math.floor(Math.random() * intNum) + 1;
  },
};


module.exports = { dbw_util, dbw_net, dbw_fs, dbw_time, dbw_json, success, fail, md5, formateTime, promisify, getObjectId, deleteDir, easyDownImage };

/**
 * 外部使用方法
 * let {dbw_net,dbw_fs,dbw_time,dbw_json} = require('./dbw_tool')
 */


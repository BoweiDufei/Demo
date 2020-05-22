'use strict';

// https://blog.csdn.net/jinxlzc/article/details/82972006
const Controller = require('egg').Controller;

/**
 * @Controller 数据库操作
 */
class SPJController extends Controller {

  /**
   * @summary 供应商方法
   * @description
   * @router get /api/addSender
   * @response 200 baseResponse 创建成功
   */
  async addSender() {
    const snos = [ 's1', 's2', 's3', 's4', 's5' ];
    const snames = [ '精益', '圣熙', '东方红', '风太盛', '为民' ];
    const status = [ '20', '10', '30', '20', '30' ];
    const citys = [ '天津', '北京', '北京', '天津', '上海' ];
    for (let index = 0; index < snos.length; index++) {
      const item = {};
      item.sno = snos[index];
      item.sname = snames[index];
      item.status = status[index];
      item.city = citys[index];
      await this.ctx.model.Sender.create(item);
    }
    this.ctx.body = 'addSender - 数据添加完成';
  }

  /**
   * @summary 添加零件方法
   * @description
   * @router get /api/addPart
   * @response 200 baseResponse 创建成功
   */
  async addPart() {
    const pnos = [ 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ];
    const pnames = [ '螺母', '螺栓', '螺丝刀', '螺丝刀', '凸轮', '齿轮' ];
    const colors = [ '红', '绿', '蓝', '红', '蓝', '红' ];
    const weights = [ '12', '17', '14', '14', '40', '40' ];
    for (let index = 0; index < pnos.length; index++) {
      const item = {};
      item.pno = pnos[index];
      item.pname = pnames[index];
      item.color = colors[index];
      item.weight = weights[index];
      await this.ctx.model.Part.create(item);
    }
    this.ctx.body = 'addPart - 数据添加完成';
  }

  /**
   * @summary 添加项目
   * @description
   * @router get /api/addJect
   * @response 200 baseResponse 创建成功
   */
  async addJect() {
    const jnos = [ 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7' ];
    const jnames = [ '三建', '一汽', '弹簧厂', '造船厂', '机车厂', '无线电厂', '半导体厂' ];
    const citys = [ '北京', '长春', '天津', '天津', '唐山', '常州', '南京' ];
    for (let index = 0; index < jnos.length; index++) {
      const item = {};
      item.jno = jnos[index];
      item.jname = jnames[index];
      item.city = citys[index];
      await this.ctx.model.Ject.create(item);
    }
    this.ctx.body = 'addJect - 数据添加完成';
  }

  /**
   * @summary 添加spj表
   * @description
   * @router get /api/addSpj
   * @response 200 baseResponse 创建成功
   */
  async addSpj() {
    const snos = [ 's1', 's2', 's3', 's4', 's5' ];
    const pnos = [ 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ];
    const js = [ 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7' ];

    for (let index = 0; index < 40; index++) {
      const item = {};

      const snoRandomInt = this.ctx.helper.dbw_json.getRandomIntNum(100) % snos.length;
      item.sno = snos[snoRandomInt];

      const pnoRandomInt = this.ctx.helper.dbw_json.getRandomIntNum(100) % pnos.length;
      item.pno = pnos[pnoRandomInt];

      const jsRandomInt = this.ctx.helper.dbw_json.getRandomIntNum(100) % js.length;
      item.jno = js[jsRandomInt];

      item.qty = this.ctx.helper.dbw_json.getRandomIntNum(600) + 100;

      await this.ctx.model.Spj.create(item);
    }
    this.ctx.body = 'addSpj - 数据添加完成';
  }

  /**
   * @summary 求供应工程J1零件的供应商号码SNO
   * @description
   * @router get /api/spj/search01
   * @response 200 baseResponse 创建成功
   */
  async search01() {
    const result = await this.ctx.model.Spj.aggregate([
      {
        $match: {
          jno: 'j1',
        },
      },
      {
        $project: {
          sno: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }
  /**
   * @summary 找出所有供应商的姓名和所在城市；
   * @description
   * @router get /api/spj/search02
   * @response 200 baseResponse 创建成功
   */
  async search02() {
    const result = await this.ctx.model.Sender.aggregate([
      {
        $project: {
          sname: 1,
          city: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }
  /**
   * @summary 找出所有零件的名称 、颜色、重量；
   * @description
   * @router get /api/spj/search03
   * @response 200 baseResponse 创建成功
   */
  async search03() {
    const result = await this.ctx.model.Part.aggregate([
      {
        $project: {
          pname: 1,
          color: 1,
          weight: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 找出使用供应商S1所供应零件的工程号码；
   * @description
   * @router get /api/spj/search04
   * @response 200 baseResponse 创建成功
   */
  async search04() {
    const result = await this.ctx.model.Spj.aggregate([
      {
        $match: { sno: 's1' },
      },
      {
        $project: {
          jno: 1,
        },
      },
      {
        $group: {
          _id: '$jno',
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 找出工程项目J2使用的各种零件的名称及其数量；
   * @description
   * @router get /api/spj/search05
   * @response 200 baseResponse 创建成功
   */
  async search05() {
    const result = await this.ctx.model.Spj.aggregate([
      {
        $match: {
          jno: 'j2',
        },
      },
      {
        $lookup: {
          from: 'part',
          localField: 'pno',
          foreignField: 'pno',
          as: 'part',
        },
      },
      {
        $unwind: {
          path: '$part',
        },
      },
      {
        $project: {
          qty: 1,
          pname: '$part.pname',
          color: '$part.color',
          weight: '$part.weight',
        },
      },
    ]);
    this.ctx.body = result;
  }
}

module.exports = SPJController;

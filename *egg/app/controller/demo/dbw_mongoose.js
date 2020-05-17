'use strict';

// https://blog.csdn.net/weixin_39718665/article/details/78161013
const Controller = require('egg').Controller;

/**
 * @Controller 数据库操作
 */
class Dbw_mongooseController extends Controller {
  /**
   * @summary 添加学生信息方法
   * @description
   * @router get /api/addStudent
   * @response 200 baseResponse 创建成功
   */
  async addStucent() {
    // const params = this.ctx.query;
    // console.log(`params = ${params}`);
    const snos = [ '108', '105', '107', '101', '109', '103' ];
    const snames = [ '曾华', '匡明', '王丽', '李军', '王芳', '陆军' ];
    const ssexs = [ '1', '1', '0', '1', '0', '1' ];
    const sbirdays = [ '1977-09-01', '1975-10-02', '1976-01-23', '1976-02-20', '1975-02-10', '1974-06-03' ];
    const classes = [ '95033', '95031', '95033', '95033', '95031', '95033' ];
    for (let index = 0; index < snos.length; index++) {
      const item = {};
      item.sno = snos[index];
      item.sname = snames[index];
      item.ssex = ssexs[index];
      item.sbirthday = sbirdays[index];
      item.class = classes[index];
      await this.ctx.model.Student.create(item);
    }
    this.ctx.body = '数据添加完成';
  }

  /**
   * @summary 添加课程信息方法
   * @description
   * @router get /api/addCourse
   * @response 200 baseResponse 创建成功
   */
  async addCourse() {
    const cnos = [ '3-105', '3-245', '6-166', '9-888' ];
    const cnames = [ '计算机导论', '操作系统', '数字电路', '高等数学' ];
    const tnos = [ '825', '804', '856', '831' ];
    for (let index = 0; index < cnos.length; index++) {
      const item = {};
      item.cno = cnos[index];
      item.cname = cnames[index];
      item.tno = tnos[index];
      await this.ctx.model.Course.create(item);
    }
    this.ctx.body = '数据添加完成';
  }

  /**
   * @summary 添加分数方法
   * @description
   * @router get /api/addScore
   * @response 200 baseResponse 创建成功
   */
  async addScore() {
    const snos = [ '103', '105', '109', '103', '105', '109', '101', '107', '108', '101', '107', '108' ];
    const cnos = [ '3-245', '3-245', '3-245', '3-105', '3-105', '3-105', '3-105', '3-105', '3-105', '6-166', '6-166', '6-166' ];
    const degrees = [ 86, 75, 68, 92, 88, 76, 64, 91, 78, 85, 79, 81 ];
    for (let index = 0; index < snos.length; index++) {
      const item = {};
      item.sno = snos[index];
      item.cno = cnos[index];
      item.degree = degrees[index];
      await this.ctx.model.Score.create(item);
    }
    this.ctx.body = '数据添加完成';
  }

  /**
   * @summary 添加教师方法
   * @description
   * @router get /api/addTeachers
   * @response 200 baseResponse 创建成功
   */
  async addTeachers() {
    const tnos = [ '804', '856', '825', '831' ];
    const tnames = [ '李诚', '张旭', '王平', '刘冰' ];
    const tsex = [ '1', '1', '0', '0' ];
    const tbirthdays = [ '1958-12-02', '1969-03-12', '1972-05-05', '1977-08-14' ];
    const profs = [ '副教授', '讲师', '助教', '助教' ];
    const departs = [ '计算机系', '电子工程系', '计算机系', '电子工程系' ];
    for (let index = 0; index < tnos.length; index++) {
      const item = {};
      item.tno = tnos[index];
      item.tname = tnames[index];
      item.tsex = tsex[index];
      item.prof = profs[index];
      item.tbirthday = tbirthdays[index];
      item.depart = departs[index];
      await this.ctx.model.Teacher.create(item);
    }
    this.ctx.body = '数据添加完成';
  }


  /**
   * @summary 查询Student表中的所有记录的Sname、Ssex和Class列
   * @description
   * @router get /api/search01
   * @response 200 baseResponse 创建成功
   */
  async search01() {
    const result = await this.ctx.model.Student.find({}, { ssex: 1, sname: 1, class: 1 });
    this.ctx.body = result;
  }

  /**
   * @summary 查询教师所有的单位即不重复的Depart列。
   * @description
   * @router get /api/search02
   * @response 200 baseResponse 创建成功
   */
  async search02() {
    const result = await this.ctx.model.Student.distinct('class');
    this.ctx.body = result;
  }
  /**
   * @summary  查询Score表中成绩在60到80之间的所有记录。
   * @description
   * @router get /api/search04
   * @response 200 baseResponse 创建成功
   */
  async search04() {
    const result = await this.ctx.model.Score.find(
      {
        degree: {
          $gt: 60,
          $lt: 80,
        },
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary   查询Score表中成绩为85，86或88的记录。
   * @description
   * @router get /api/search05
   * @response 200 baseResponse 创建成功
   */
  async search05() {
    const result = await this.ctx.model.Score.find(
      {
        degree: {
          $in: [ 85, 86, 88 ],
        },
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary   查询Student表中“95031”班或性别为“女”的同学记录。
   * @description
   * @router get /api/search06
   * @response 200 baseResponse 创建成功
   */
  async search06() {
    const result = await this.ctx.model.Student.find({
      $or: [
        {
          class: '95031',
        },
        {
          ssex: '0',
        },
      ],
    });
    this.ctx.body = result;
  }

  /**
   * @summary   以Class降序查询Student表的所有记录。
   * @description
   * @router get /api/search07
   * @response 200 baseResponse 创建成功
   */
  async search07() {
    const result = await this.ctx.model.Student.find().sort(
      {
        class: 1,
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary   以Cno升序、Degree降序查询Score表的所有记录。
   * @description
   * @router get /api/search08
   * @response 200 baseResponse 创建成功
   */
  async search08() {
    const result = await this.ctx.model.Score.find().sort(
      {
        cno: 1,
        degree: -1,
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary    查询“95031”班的学生人数。
   * @description
   * @router get /api/search09
   * @response 200 baseResponse 创建成功
   */
  async search09() {
    const result = await this.ctx.model.Student.find({
      class: '95031',
    }).count();
    this.ctx.body = result;
  }

  /**
   * @summary    查询Score表中的最高分的学生学号和课程号。（子查询或者排序）
   * @description
   * @router get /api/search10
   * @response 200 baseResponse 创建成功
   */
  async search10() {
    const result = await this.ctx.model.Score.find({}, {
      sno: 1,
      cno: 1,
    }).sort({
      degree: -1,
    }).limit(1);
    this.ctx.body = result;
  }

  /**
   * @summary    查询每门课的平均成绩。
   * @description
   * @router get /api/search11
   * @response 200 baseResponse 创建成功
   */
  async search11() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: '$cno',
          num_tutorial: {
            $avg: '$degree',
          },
        },
      },
    ]);
    this.ctx.body = result;
  }
  /**
   * @summary    查询分数大于70，小于90的Sno列。
   * @description
   * @router get /api/search13
   * @response 200 baseResponse 创建成功
   */
  async search13() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $match: {
          degree: {
            $gt: 70,
            $lt: 90,
          },
        },
      },
      {
        $project: {
          sno: 1,
          cno: 1,
          degree: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary    查询所有学生的Sname、Cno和Degree列。
   * @description 关键点： 聚合管道顺序很重要 ，数组中的$project用'xxx.xxx' 来实现
   * @router get /api/search14
   * @response 200 baseResponse 创建成功
   */
  async search14() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $lookup: {
          from: 'score',
          localField: 'sno',
          foreignField: 'sno',
          as: 'item',
        },
      },
      {
        $project: {
          sname: 1,
          'item.cno': 1,
          'item.degree': 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary    查询所有学生的Sno、Cname和Degree列。
   * @description
   * @router get /api/search15
   * @response 200 baseResponse 创建成功
   */
  async search15() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $lookup: {
          from: 'student',
          localField: 'sno',
          foreignField: 'sno',
          as: 's_item',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'cno',
          foreignField: 'cno',
          as: 'c_item',
        },
      },
      {
        $project: {
          degree: 1,
          's_item.sno': 1,
          's_item.sname': 1,
          'c_item.cname': 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary    、查询“95033”班学生的平均分
   * @description
   * @router get /api/search17
   * @response 200 baseResponse 创建成功
   */
  async search17() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: { class: '95033' },
      },
      {
        $lookup: {
          from: 'score',
          localField: 'sno',
          foreignField: 'sno',
          as: 'score',
        },
      },
    ]);
    this.ctx.body = result;
  }
}

module.exports = Dbw_mongooseController;

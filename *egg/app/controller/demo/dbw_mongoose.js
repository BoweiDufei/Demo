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
    const result = await this.ctx.model.Student.aggregate([
      {
        $project: {
          sname: 1,
          ssex: 1,
          class: 1,
        },
      },
    ]);
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询Score表中成绩在60到80之间的所有记录。
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询Score表中成绩为85，86或88的记录。
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询Student表中“95031”班或性别为“女”的同学记录。
   * @description
   * @router get /api/search06
   * @response 200 baseResponse 创建成功
   */
  async search06() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          $or: [
            {
              class: '95031',
            },
            {
              ssex: '0',
            },
          ],
        },
      },
    ]);
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 以Class降序查询Student表的所有记录。
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 以Cno升序、Degree降序查询Score表的所有记录。
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询“95031”班的学生人数。
   * @description
   * @router get /api/search09
   * @response 200 baseResponse 创建成功
   */
  async search09() {
    const result = await this.ctx.model.Student.find({
      class: '95031',
    }).count();
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询Score表中的最高分的学生学号和课程号。（子查询或者排序）
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询每门课的平均成绩。
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
    this.ctx.helper.success(this.ctx, result);
  }
  /**
   * @summary 查询分数大于70，小于90的Sno列。
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
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询所有学生的Sname、Cno和Degree列。
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
          as: 'score',
        },
      },
      {
        $unwind: {
          path: '$score',
        },
      },
      {
        $project: {
          sname: 1,
          degree: '$score.degree',
          cno: '$score.cno',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'cno',
          foreignField: 'cno',
          as: 'course',
        },
      },
      {
        $unwind: {
          path: '$course',
        },
      },
      {
        $project: {
          sname: 1,
          degree: 1,
          cno: 1,
          cname: '$course.cname',
        },
      },
    ]);
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询所有学生的Sno、Cname和Degree列。
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
        $unwind: {
          path: '$s_item',
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
        $unwind: {
          path: '$c_item',
        },
      },
      {
        $project: {
          degree: 1,
          sno: '$s_item.sno',
          sname: '$s_item.sname',
          cname: '$c_item.cname',
        },
      },
      {
        $sort: {
          sno: 1,
        },
      },
    ]);
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询“95033”班学生的平均分
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
      {
        $unwind: {
          path: '$score',
        },
      },
      {
        $project: {
          _id: 0,
          degree: '$score.degree',
          cno: '$score.cno',
        },
      },
      {
        $group: {
          _id: 'degree',
          avg: {
            $avg: '$degree',
          },
        },
      },
    ]);
    this.ctx.helper.success(this.ctx, result);
  }

  /**
   * @summary 查询选修“3-105”课程的成绩高于“109”号同学成绩的所有同学的记录。
   * @description
   * @router get /api/search19
   * @response 200 baseResponse 创建成功
   */
  async search19() {
    // 1，先查出109号同学分数
    const score = await this.ctx.model.Score.find({ sno: '109', cno: '3-105' });
    console.log((`109号同学分数为：${score[0]}`));
    const scoreModel = score[0];
    if (scoreModel != null) {
      const stuScore = scoreModel.degree;
      // 2，查出比109号同学分数高的同学集合
      const result = await this.ctx.model.Score.aggregate([
        {
          $match: {
            cno: '3-105',
            degree: {
              $gt: stuScore,
            },
          },
        },
        {
          $lookup: {
            from: 'student',
            localField: 'sno',
            foreignField: 'sno',
            as: 'student',
          },
        },
      ]);
      this.ctx.helper.success(this.ctx, result);
    } else {
      this.ctx.helper.fail(this.ctx);
    }
  }

  /**
   * @summary 查询成绩高于学号为“101”、课程号为“3-105”的成绩的所有记录。
   * @description
   * @router get /api/search21
   * @response 200 baseResponse 创建成功
   */
  async search21() {
    // 1，查找学号为109 且课程号为3-105的成绩
    const scoreList = await this.ctx.model.Score.find({ sno: '101', cno: '3-105' });
    const scoreItem = scoreList[0];
    if (scoreItem != null) {
      console.log(`数据为：${scoreItem.degree}`);
      // 2，查找成绩高于此成绩的所有记录
      const result = await this.ctx.model.Score.aggregate([
        {
          $match: {
            cno: '3-105',
            degree: {
              $gt: scoreItem.degree,
            },
          },
        },
        {
          $lookup: {
            from: 'student',
            localField: 'sno',
            foreignField: 'sno',
            as: 'student',
          },
        },
      ]);
      this.ctx.body = result;
    } else {
      this.ctx.body = '没有找到数据';
    }
  }

  /**
   * @summary 查询和学号为108、101的同学同年出生的所有学生的Sno、Sname和Sbirthday列。
   * @description
   * @router get /api/search22
   * @response 200 baseResponse 创建成功
   */
  async search22() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          $or: [{ sno: '108' }, { sno: '101' }],
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'sbirthday',
          foreignField: 'sbirthday',
          as: 'other',
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询“张旭“教师任课的学生成绩。
   * @description
   * @router get /api/search23
   * @response 200 baseResponse 创建成功
   */
  async search23() {

    console.time();
    // 1，先查询老师
    const teacherList = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          tname: '张旭',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'tno',
          foreignField: 'tno',
          as: 's',
        },
      },
    ]);
    //
    const teacherModel = teacherList[0];
    if (teacherModel != null) {
      const s = teacherModel.s;
      const s_0 = s[0];
      if (s_0 != null) {
        const cno = s_0.cno;

        // 2，获取到课程编码，从score表中查询学生数据
        const resultInfo = await this.ctx.model.Score.aggregate([
          {
            $match: { cno },
          },
          {
            $lookup: {
              from: 'student',
              localField: 'sno',
              foreignField: 'sno',
              as: 's',
            },
          },
          {
            $unwind: {
              path: '$s',
            },
          },
          {
            $project: {
              _id: 1,
              sno: 1,
              degree: 1,
              cno: 1,
              sname: '$s.sname',
              sbirthday: '$s.sbirthday',
              class: '$s.class',
            },
          },
        ]);
        console.timeEnd();
        this.ctx.body = resultInfo;
      } else {
        this.ctx.body = '没有查到数据';
      }
    } else {
      this.ctx.body = '没有查到数据';
    }
  }

  /**
   * @summary 查询选修某课程的同学人数多于5人的教师姓名。
   * @description
   * @router get /api/search24
   * @response 200 baseResponse 创建成功
   */
  async search24() {
    // 查询某课程人数
    const t_result = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: '$cno',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: {
            $gt: 5,
          },
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: '_id',
          foreignField: 'cno',
          as: 't',
        },
      },
    ]);
    // 查询对应的老师
    const teacherModel = t_result[0];
    if (teacherModel != null) {
      const t_0 = teacherModel.t[0];
      if (t_0 != null) {
        const tno = t_0.tno;
        this.ctx.body = await this.ctx.model.Teacher.find({ tno });
      } else {
        this.ctx.body = '没有查到数据';
      }
    } else {
      this.ctx.body = '没有查到数据';
    }
  }

  /**
   * @summary 查询95033班和95031班全体学生的记录。
   * @description
   * @router get /api/search25
   * @response 200 baseResponse 创建成功
   */
  async search25() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          $or: [
            { class: '95033' },
            { class: '95031' },
          ],
        },
      },
      {
        $group: {
          _id: '$class',
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: '_id',
          foreignField: 'class',
          as: 'items',
        },
      },
      {
        $project: {
          _id: 1,
          'items._id': 1,
          'items.sname': 1,
          'items.sbirthda': 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询存在有85分以上成绩的课程Cno。
   * @description
   * @router get /api/search26
   * @response 200 baseResponse 创建成功
   */
  async search26() {
    const result = await this.ctx.model.Score.find(
      {
        degree: { $gt: 85 },
      },
      {
        cno: 1,
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary 查询出“计算机系“教师所教课程的成绩表
   * @description 很重要，多次聚会查询数据的首次尝试
   * @router get /api/search27
   * @response 200 baseResponse 创建成功
   */
  async search27() {
    const teacherList = await this.ctx.model.Teacher.aggregate([
      {
        $match: { depart: '计算机系' },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'tno',
          foreignField: 'tno',
          as: 'c',
        },
      },
    ]);
    const cnos = [];
    for (let index = 0; index < teacherList.length; index++) {
      const element = teacherList[index];
      const cList = element.c;
      const c_01 = cList[0];
      if (c_01 != null) {
        cnos.push(c_01.cno);
      }
    }
    if (cnos.length > 0) {
      const result = await this.ctx.model.Score.aggregate([
        {
          $match: {
            cno: {
              $in: cnos,
            },
          },
        },
        {
          $lookup: {
            from: 'course',
            localField: 'cno',
            foreignField: 'cno',
            as: 'course',
          },
        },
        {
          $lookup: {
            from: 'student',
            localField: 'sno',
            foreignField: 'sno',
            as: 'student',
          },
        },
        {
          $lookup: {
            from: 'teacher',
            localField: 'course.tno',
            foreignField: 'tno',
            as: 'teacher',
          },
        },
      ]);
      this.ctx.body = result;
    } else {
      this.ctx.body = '没有找到数据';
    }
  }


  /**
   * @summary 查询“计算机系”与“电子工程系“不同职称的教师的Tname和Prof。
   * @description
   * @router get /api/search28
   * @response 200 baseResponse 创建成功
   */
  async search28() {
    const result = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          depart: {
            $nin: [ '计算机系' ],
          },
        },
      },
      {
        $project: {
          tname: 1,
          prof: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询选修编号为“3-105“课程且成绩至少高于选修编号为“3-245”的同学的Cno、Sno和Degree,并按Degree从高到低次序排序。。
   * @description 重要。lookup和unwind配合，可以消除数组
   * @router get /api/search29
   * @response 200 baseResponse 创建成功
   */
  async search29() {
    // 1，获取3-245 的最高分
    const maxScoreList = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: '$cno',
          max: {
            $max: '$degree',
          },
        },
      },
      {
        $match: {
          _id: '3-245',
        },
      },
    ]);

    const maxItem = maxScoreList[0];
    if (maxItem != null) {
      const maxScore = maxItem.max;

      // 2 查询大于这个数据的3-105
      const result = await this.ctx.model.Score.aggregate([
        {
          $match: {
            degree: {
              $gt: maxScore,
            },
          },
        },
        {
          $sort: {
            degree: -1,
          },
        },
        {
          $lookup: {
            from: 'student',
            localField: 'sno',
            foreignField: 'sno',
            as: 'student',
          },
        },
        {
          $unwind: {
            path: '$student',
          },
        },
        {
          $project: {
            _id: 1,
            degree: 1,
            sno: '$student.sno',
            sname: '$student.sname',
          },
        },
      ]);

      this.ctx.body = result;
    } else {
      this.ctx.body = '错误数据';
    }
  }


  /**
   * @summary 查询所有教师和同学的name、sex和birthday。
   * @description 实现sql类似的union方法
   * @router get /api/search31
   * @response 200 baseResponse 创建成功
   */
  async search31() {
    const resutl = await this.ctx.model.Teacher.aggregate([
      {
        $group: {
          _id: 'any',
          t_list: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'a',
          foreignField: 'b',
          as: 's_list',
        },
      },
      {
        $project: {
          _id: 0,
          allValue: {
            $setUnion: [ '$t_list', '$s_list' ],
          },
        },
      },
    ]);
    this.ctx.body = resutl;
  }

  /**
   * @summary 查询所有“女”教师和“女”同学的name、sex和birthday
   * @description 实现sql类似的union方法
   * @router get /api/search32
   * @response 200 baseResponse 创建成功
   */
  async search32() {
    const result = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          tsex: '0',
        },
      },
      {
        $group: {
          _id: 'any',
          t_list: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'a',
          foreignField: 'b',
          as: 'student',
        },
      },
      {
        $project: {
          _id: 0,
          list: {
            $setUnion: [ '$t_list', '$student' ],
          },
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询成绩比该课程平均成绩低的同学的成绩表。
   * @description 实现sql类似的union方法
   * @router get /api/search33
   * @response 200 baseResponse 创建成功
   */
  async search33() {
    const avg = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: '$cno',
          avg: {
            $avg: '$degree',
          },
        },
      },
      {
        $lookup: {
          from: 'score',
          localField: '_id',
          foreignField: 'cno',
          as: 's',
        },
      },
      {
        $unwind: {
          path: '$s',
        },
      },
      {
        $project: {
          _id: 1,
          avg: 1,
          sno: '$s.sno',
          degree: '$s.degree',
        },
      },
      {
        $project: {
          _id: 1,
          avg: 1,
          sno: 1,
          degree: 1,
          gap: {
            // $add  multiply  divide
            $subtract: [ '$degree', '$avg' ],
          },
        },
      },
      {
        $match: {
          gap: {
            $lt: 0,
          },
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'sno',
          foreignField: 'sno',
          as: 'student',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: '_id',
          foreignField: 'cno',
          as: 'course',
        },
      },
      {
        $unwind: {
          path: '$course',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: 1,
          avg: 1,
          sno: 1,
          degree: 1,
          sname: '$student.sname',
          cname: '$course.cname',
        },
      },
    ]);
    this.ctx.body = avg;
  }

  /**
   * @summary 查询所有任课教师的Tname和Depart。
   * @description 实现sql类似的union方法
   * @router get /api/search34
   * @response 200 baseResponse 创建成功
   */
  async search34() {
    // 1, 查询所有课程的老师编号
    const courseList = await this.ctx.model.Course.aggregate([
      {
        $project: {
          tno: 1,
        },
      },
    ]);
    const c_list = [];
    for (let index = 0; index < courseList.length; index++) {
      const element = courseList[index];
      c_list.push(element.tno);
    }
    // 2，查询老师
    const result = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          tno: {
            $in: c_list,
          },
        },
      },
      {
        $project: {
          tname: 1,
          depart: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询所有未讲课的教师的Tname和Depart。
   * @description 实现sql类似的union方法
   * @router get /api/search35
   * @response 200 baseResponse 创建成功
   */
  async search35() {
    // 1, 查询所有课程的老师编号
    const courseList = await this.ctx.model.Course.aggregate([
      {
        $project: {
          tno: 1,
        },
      },
    ]);
    const c_list = [];
    for (let index = 0; index < courseList.length; index++) {
      const element = courseList[index];
      if (index !== 0) {
        // 造一个假数据
        c_list.push(element.tno);
      }
    }
    // 2，查询老师
    const result = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          tno: {
            $nin: c_list,
          },
        },
      },
      {
        $project: {
          tname: 1,
          depart: 1,
        },
      },
    ]);
    this.ctx.body = result;
  }


  /**
   * @summary 查询至少有2名男生的班号。
   * @description 实现sql类似的union方法
   * @router get /api/search36
   * @response 200 baseResponse 创建成功
   */
  async search36() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          ssex: '1',
        },
      },
      {
        $group: {
          _id: '$class',
          num: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          num: {
            $gt: 2,
          },
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询Student表中不姓“王”的同学记录
   * @description
   * @router get /api/search37
   * @response 200 baseResponse 创建成功
   */
  async search37() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          sname: {
            $regex: '^(?!王)',
          },
        },
      },
    ]);
    this.ctx.body = result;
  }
  /**
   * @summary 查询Student表中姓“王”的同学记录
   * @description
   * @router get /api/search375
   * @response 200 baseResponse 创建成功
   */
  async search375() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          sname: {
            $regex: '^[^王]',
          },
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询Student表中每个学生的姓名和年龄。
   * @description
   * @router get /api/search38
   * @response 200 baseResponse 创建成功
   */
  async search38() {
    this.ctx.body = '暂时没想到如何去做';
  }

  /**
   * @summary 查询Student表中最大和最小的Sbirthday日期值。
   * @description
   * @router get /api/search39
   * @response 200 baseResponse 创建成功
   */
  async search39() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $sort: {
          sbirthday: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);
    this.ctx.body = result;
  }
  /**
   * @summary 以班号和年龄从大到小的顺序查询Student表中的全部记录。
   * @description
   * @router get /api/search40
   * @response 200 baseResponse 创建成功
   */
  async search40() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $sort: {
          sbirthday: 1,
          class: -1,
        },
      },
    ]);
    this.ctx.body = result;
  }


  /**
   * @summary 查询“男”教师及其所上的课程
   * @description
   * @router get /api/search41
   * @response 200 baseResponse 创建成功
   */
  async search41() {
    const result = await this.ctx.model.Teacher.aggregate([
      {
        $match: {
          tsex: '1',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'tno',
          foreignField: 'tno',
          as: 'course',
        },
      },
      {
        $unwind: {
          path: '$course',
        },
      },
      {
        $project: {
          tname: 1,
          prof: 1,
          depart: 1,
          tno: 1,
          cname: '$course.cname',
        },
      },
    ]);
    this.ctx.body = result;
  }


  /**
   * @summary 查询最高分同学的Sno、Cno和Degree列。
   * @description
   * @router get /api/search42
   * @response 200 baseResponse 创建成功
   */
  async search42() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $sort: {
          degree: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: 'student',
          localField: 'sno',
          foreignField: 'sno',
          as: 'student',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'cno',
          foreignField: 'cno',
          as: 'course',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $unwind: {
          path: '$course',
        },
      },
      {
        $project: {
          degree: 1,
          cno: 1,
          sno: 1,
          _id: 1,
          sname: '$student.sname',
          cname: '$course.cname',
        },
      },
    ]);
    this.ctx.body = result;
  }


  /**
   * @summary 查询和“李军”同性别的所有同学的Sname。
   * @description
   * @router get /api/search43
   * @response 200 baseResponse 创建成功
   */
  async search43() {
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          sname: '李军',
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'ssex',
          foreignField: 'ssex',
          as: 'student',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: '$student._id',
          sname: '$student.sname',
          sbirthday: '$student.sbirthday',
          class: '$student.class',
        },
      },
      {
        $match: {
          sname: {
            // 过滤掉 李军
            $ne: '李军',
          },
        },
      },
    ]);
    this.ctx.body = result;
  }

  /**
   * @summary 查询和“李军”同性别并同班的同学Sname。
   * @description
   * @router get /api/search44
   * @response 200 baseResponse 创建成功
   */
  async search44() {
    // 1，获取李军同学的身份信息
    const result = await this.ctx.model.Student.aggregate([
      {
        $match: {
          sname: '李军',
        },
      },
    ]);

    const ljInfo = result[0];
    if (ljInfo !== null) {
      const result = await this.ctx.model.Student.aggregate([
        {
          $match: {
            ssex: ljInfo.ssex,
            class: ljInfo.class,
            sname: {
              $ne: ljInfo.sname,
            },
          },
        },
      ]);
      this.ctx.body = result;
    } else {
      this.ctx.body = '没有查到有效数据';
    }
  }

  /**
   * @summary 查询所有选修“计算机导论”课程的“男”同学的成绩表。
   * @description
   * @router get /api/search45
   * @response 200 baseResponse 创建成功
   */
  async search45() {
    const resule = await this.ctx.model.Course.aggregate([
      {
        $match: {
          cname: '计算机导论',
        },
      },
      {
        $lookup: {
          from: 'score',
          localField: 'cno',
          foreignField: 'cno',
          as: 'score',
        },
      },
      {
        $unwind: {
          path: '$score',
        },
      },
      {
        $project: {
          _id: 1,
          cname: 1,
          degree: '$score.degree',
          sno: '$score.sno',
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'sno',
          foreignField: 'sno',
          as: 'student',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: '$student._id',
          degree: 1,
          ssex: '$student.ssex',
          sname: '$student.sname',
          cname: 1,
          sbirthday: '$student.sbirthday',
        },
      },
      {
        $match: {
          ssex: '1',
        },
      },
    ]);
    this.ctx.body = resule;
  }

  /**
   * @summary 用一条SQL 语句 查询出每门课都大于80 分的学生姓名
   * @description
   * @router get /api/search46
   * @response 200 baseResponse 创建成功
   */
  async search46() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: '$sno',
          min: {
            $min: '$degree',
          },
        },
      },
      {
        $match: {
          min: {
            $gt: 80,
          },
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: '_id',
          foreignField: 'sno',
          as: 'student',
        },
      },
      {
        $unwind: {
          path: '$student',
        },
      },
      {
        $project: {
          _id: '$student._id',
          sno: '$student.sno',
          sname: '$student.sname',
          ssex: '$student.ssex',
          class: '$student.class',
        },
      },
    ]);
    this.ctx.body = result;
  }


  /**
   * @summary 删除除了自动编号不同, 其他都相同的学生冗余信息
   * @description 重要 首次用到$group多个值的方法 用到$push方法构造结果数组
   * @router get /api/search47
   * @response 200 baseResponse 创建成功
   */
  async search47() {
    const result = await this.ctx.model.Score.aggregate([
      {
        $group: {
          _id: {
            sno: '$sno',
            cno: '$cno',
            degree: '$degree',
          },
          list: {
            $push: '$_id',
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          count: {
            $gt: 1,
          },
        },
      },
    ]);
    if (result.length > 0) {
      const item = result[0];
      const list = item.list;
      const r = await this.ctx.model.Score.deleteMany({
        _id: {
          $in: list,
        },
      });
      this.ctx.body = r;
    } else {
      this.ctx.body = '没有查找到符合条件的数据';
    }
  }

  /**
   * @summary 修改除了自动编号不同, 其他都相同的学生冗余信息
   * @description
   * @router get /api/search48
   * @response 200 baseResponse 创建成功
   */
  async search48() {
    const result = await this.ctx.model.Score.updateOne(
      {
        _id: '5ec26cbee37c80158b0506a6',
      },
      {
        $set: {
          degree: 89,
        },
      }
    );
    this.ctx.body = result;
  }

  /**
   * @summary 修改除了自动编号不同, 其他都相同的学生冗余信息
   * @description
   * @router get /api/search49
   * @response 200 baseResponse 创建成功
   */
  async search49() {
    const fs = require('fs');
    const fromPath = 'app/public/1.html';
    const toPath = 'app/public/2.html';

    const readStream = fs.createReadStream(fromPath);
    const writeStream = fs.createWriteStream(toPath);
    writeStream.on('finish', () => {
      // this.ctx.body = 'body finish';
      // this.ctx.res.end('finish');
    });
    readStream.pipe(writeStream);
    this.ctx.res.end('finish');
    // https://www.jianshu.com/p/3e4da3b39444
    // const rs = fs.createReadStream(path);
    // rs.pipe(this.ctx.body);
    // rs.on('end', () => {
    //   this.ctx.body.end();
    // });
    // ServerResponse
    // ServerResponse
    // fs.createReadStream(path).pipe(this.ctx.res);
    // console.log(this.ctx.res);
    // this.ctx.body = 'aaa';
  }

}

module.exports = Dbw_mongooseController;

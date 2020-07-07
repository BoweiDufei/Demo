'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 文章操作
 */
class ArticleController extends Controller {
  /**
  * @summary 获取文章列表
  * @description 获取文章列表
  * @router get /api/getSumarArticles
  * @request bbb
  * @response 200 baseResponse 创建成功
  */
  async getSumarArticles() {
    let limit = this.ctx.query.limit || '5';

    // 用户名字，如果没有登录就用 设备id
    // eslint-disable-next-line no-unused-vars
    let currentUserId = '';
    if (this.ctx.request.headers.deviceid != null) {
      currentUserId = this.ctx.request.headers.deviceid;
    }
    if (this.ctx.userId != null) {
      currentUserId = this.ctx.userId;
    }

    const noShowList = [];
    if (currentUserId.length > 0) {
      /** 大于30天前的内容 */
      const day_30 = new Date().setMonth((new Date().getMonth() - 1));
      const readList = await this.ctx.model.Articleread.aggregate([
        {
          $match: {
            userId: currentUserId,
            createdAt: {
              $gte: new Date(day_30),
            },
          },
        },
        {
          $project: {
            articleId: 1,
          },
        },
      ]);
      for (let index = 0; index < readList.length; index++) {
        const element = readList[index];
        noShowList.push(this.ctx.helper.getObjectId(element.articleId));
      }
    }
    limit = parseInt(limit);
    // const result = await this.ctx.model.Sumarticle.find().limit(limit).skip(num * limit);
    const result = await this.ctx.model.Sumarticle.aggregate([
      {
        $match: {
          _id: {
            $nin: noShowList,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: limit,
      },
    ]);
    // 存储进数据库
    if (currentUserId.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const info = result[index];
        const item = {};
        item.userId = currentUserId;
        item.articleId = info._id;
        try {
          await this.ctx.model.Articleread.create(item);
        } catch (error) {
          console.log(error);
        }
      }
    }
    this.ctx.helper.success(this.ctx, result);
  }

  /**
 * @summary 获取某文章详细内容
 * @description 获取某文章详细内容
 * @router get /api/getArticleDetailById
 * @request bbb
 * @response 200 baseResponse 创建成功
 */
  async getArticleDetailById() {
    const article_id = this.ctx.query.id;
    if (article_id === null) {
      this.ctx.helper.fail(this.ctx, '请保证article_id不为空');
      return;
    }
    const result = await this.ctx.model.Sumarticle.aggregate([
      {
        $match: {
          _id: this.ctx.helper.getObjectId(article_id),
        },
      },
      {
        $lookup: {
          from: 'detailarticle',
          localField: '_id',
          foreignField: 'articleId',
          as: 'item',
        },
      },
      {
        $unwind: '$item'
      },
      {
        $project: {
          _id: '$item._id',
          titleStr: 1,
          contentStr: 1,
          articleStr: '$item.articleStr',
          createdAt: '$item.createdAt',
        }
      },
    ]);
    this.ctx.helper.success(this.ctx, result);
  }


}

module.exports = ArticleController;

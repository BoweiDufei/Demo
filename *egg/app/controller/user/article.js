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
      let num = this.ctx.query.page || '0';
      let limit = this.ctx.query.limit || '10';
      num = parseInt(num);
      limit = parseInt(limit);
      console.log('limit = ',limit);
      const result = await this.ctx.model.Sumarticle.find().limit(limit).skip(num*limit);
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
    if (article_id === null){
        this.ctx.helper.fail(this.ctx, '请保证article_id不为空');
        return ;
    }
    const result = await this.ctx.model.Sumarticle.aggregate([
        {
            $match:{
                _id:this.ctx.helper.getObjectId(article_id)
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
            $project:{
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

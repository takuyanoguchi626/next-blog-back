import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateArticleDto } from './dto/Article.dto';
import { Article } from './interfaces/Article.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('articles') private readonly articleModel: Model<Article>,
  ) {}
  /**
   * 記事を投稿する.
   *
   * @param createArticle - クライアントから送られてきた記事情報
   * @returns 投稿した記事情報
   */
  async createArticle(createArticle: CreateArticleDto) {
    const article = new this.articleModel({
      ...createArticle,
      postDate: new Date(),
    });
    return await article.save();
  }
  /**
   * DBの全記事を取得する.
   *
   * @returns DBの全記事
   */
  async findAll() {
    return await this.articleModel.find().exec();
  }
  /**
   * DBの全記事のIDを取得する.
   *
   * @returns DBの全記事のID
   */
  async findAllIds() {
    return await this.articleModel.find({}, { _id: 1 }).exec();
  }
  /**
   * 最新の3記事を取得する.
   *
   * @returns 最新の３記事
   */
  async getRecentArticles() {
    const articles = await this.articleModel
      .find()
      .sort({ postDate: -1 })
      .limit(3);
    return articles;
  }
  /**
   * 過去の7記事を取得する.
   *
   * @returns 過去の7記事
   */
  async getPastArticles() {
    const articles = await this.articleModel
      .find()
      .sort({ postDate: -1 })
      .limit(9);
    articles.splice(0, 3);
    return articles;
  }
  /**
   * 記事のIDから記事を1件取得する.
   *
   * @param articleId - 記事のID
   * @returns 1件の記事
   */
  async findOne(articleId: string) {
    const articles = await this.findAll();
    const article = articles.filter(
      (article) => article._id === articleId,
    ) as Article[];
    return article[0];
  }
}

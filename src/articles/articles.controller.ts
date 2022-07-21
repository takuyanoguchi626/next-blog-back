import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/Article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}
  /**
   * DB内の全記事を取得する.
   *
   * @returns DB内の全記事
   */
  @Get()
  findAll() {
    return this.articleService.findAll();
  }
  /**
   * 記事IDからDBの記事情報を取得する.
   *
   * @param articleId - 記事のID
   * @returns 一記事の情報
   */
  @Get('/article/:articleId')
  findOne(@Param('articleId') articleId: string) {
    return this.articleService.findOne(articleId);
  }
  /**
   * DB内の全記事のIDを取得する.
   *
   * @returns DB内の全記事のID
   */
  @Get('allIdsOfArticles')
  getAllIdsOfArticles() {
    return this.articleService.findAllIds();
  }
  /**
   * DB内の最新の3記事を取得する.
   *
   * @returns DB内の最新の3記事
   */
  @Get('recentArticles')
  getRecentArticles() {
    return this.articleService.getRecentArticles();
  }
  /**
   * DB内の最新の3記事以外の全記事を取得する.
   *
   * @returns DB内の最新の3記事以外の全記事
   */
  @Get('pastArticles')
  getPastArticles() {
    return this.articleService.getPastArticles();
  }
  /**
   * 記事を投稿する.
   *
   * @param createArticle - 投稿する記事情報
   * @returns 投稿した記事情報
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArticle: CreateArticleDto) {
    return this.articleService.createArticle(createArticle);
  }
  /**
   * 記事を編集する.
   * ※まだserviceは未完成
   *
   * @param editArticle - 編集する記事の情報
   * @returns
   */
  @Patch()
  edit(@Body() editArticle: CreateArticleDto) {
    return;
  }
}

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

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get('/article/:articleId')
  findOne(@Param('articleId') articleId: string) {
    return this.articleService.findOne(articleId);
  }

  @Get('allIdsOfArticles')
  getAllIdsOfArticles() {
    return this.articleService.findAllIds();
  }

  @Get('recentArticles')
  getRecentArticles() {
    return this.articleService.getRecentArticles();
  }

  @Get('pastArticles')
  getPastArticles() {
    return this.articleService.getPastArticles();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArticle: CreateArticleDto) {
    return this.articleService.createArticle(createArticle);
  }

  @Patch()
  edit(@Body() editArticle: CreateArticleDto) {
    return;
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSchema } from './Schemas/Article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'articles', schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

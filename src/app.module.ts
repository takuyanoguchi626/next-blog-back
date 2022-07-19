import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ArticlesModule,
    MongooseModule.forRoot(
      'mongodb+srv://takuya:takuya-nextblog@next-blog-nestjs-db.yc826w0.mongodb.net/nextblog?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

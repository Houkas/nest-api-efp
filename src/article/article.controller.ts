import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ArticleService } from './article.service';

@UseGuards(JwtGuard)
@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService){

    }
    @Post('create')
    createArticle(@Body() slug:string, title:string, body:string){
        return this.articleService.createArticle(slug, title, body)
    }
}

import { Injectable } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from "../prisma/prisma.service";
import { CreateArticleDto, EditArticleDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService){

    }

    getArticles(userId: number){
        return this.prisma.article.findMany({
            where: {
                userID: userId
            }
        })
    }

    getArticleById(userId: number, articleId:number){
        
    }

    async createArticle(userId: number, dto: CreateArticleDto){
        try{
             const article = await this.prisma.article.create({ 
            data:{
                userID: userId,
                ...dto,
            },
        });
        return article;
        } 
        catch(error){
            console.log(error)
            throw error;
        }
       
        
    }

    editArticleById(userId: number, articleId: number, dto: EditArticleDto){
        
    }

    deleteArticleById(userId: number, articleId:number){

    }
    
}

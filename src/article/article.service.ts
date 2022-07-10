import { ForbiddenException, Injectable } from '@nestjs/common';
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
        return this.prisma.article.findMany({
            where: {
                id: articleId,
                userID: userId
            }
        })
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

    async editArticleById(userId: number, articleId: number, dto: EditArticleDto){

        // get the article by id
        const article = await this.prisma.article.findUnique({
            where:{
                id: articleId
            }
        });
        
        // then check if user owns the article
        if(!article || article.userID !== userId){
            throw new ForbiddenException('Accès à la ressource non autorisé');
        };

        return this.prisma.article.update({
            where: {
                id: articleId,
            },
            data:{
                ...dto
            }
        });

    }

    async deleteArticleById(userId: number, articleId:number){

        // get the article by id
        const article = await this.prisma.article.findUnique({
            where:{
                id: articleId
            }
        });
        
        // then check if user owns the article
        if(!article || article.userID !== userId){
            throw new ForbiddenException('Accès à la ressource non autorisé');
        };

        // then delete this article
        return this.prisma.article.delete({
            where: {
                id: articleId,
            }
        });
    }
    
}

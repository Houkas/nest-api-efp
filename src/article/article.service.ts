import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService){

    }
    async createArticle(slug:string, title:string, body:string){
        try{
            const article = await this.prisma.article.create({ 
                data:{
                    title:title,
                    slug:slug,
                    body:JSON.stringify(body),
                    userID: 2
                },
            });
            return article;
        } 
        catch(error){
            throw error;
        }
        
    }
}

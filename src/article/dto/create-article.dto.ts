import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateArticleDto{
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    slug: string

    @IsString()
    @IsOptional()
    meta_description?: string

    @IsString()
    @IsOptional()
    body?: string
}
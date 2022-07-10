import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditArticleDto{
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    slug?: string

    @IsString()
    @IsOptional()
    meta_description?: string

    @IsString()
    @IsOptional()
    body?: string
}
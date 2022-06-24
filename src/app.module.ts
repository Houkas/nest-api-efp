import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { RealisationModule } from './realisation/realisation.module';
import { PartenaireModule } from './partenaire/partenaire.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AuthModule, UserModule, ArticleModule, RealisationModule, PartenaireModule, PrismaModule],
})
export class AppModule {}

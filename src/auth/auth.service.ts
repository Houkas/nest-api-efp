import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({

})
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
        ){
        
    }
    async signin(dto: AuthDto){
        // Trouver l'utilisateur en db avec l'email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        // Si l'utilisateur n'existe pas renvoyer une erreur
        if(!user) throw new ForbiddenException('Credentials incorectes.')
        
        // comparer les mdp
        const pwMatches = await argon.verify(user.hash, dto.password)
        
        // si mdp incorrect renvoyer erreur
        if(!pwMatches) throw new ForbiddenException('Credentials incorectes.')
        
        
        return this.signtoken(user.id, user.email);
    }

    async signup(dto: AuthDto){
        // Générer la password haché
        const hash = await argon.hash(dto.password);
        try{
             // Sauver le nouvel user en db
        const user = await this.prisma.user.create({ 
            data:{
                email: dto.email,
                hash,
            },
        });
        return this.signtoken(user.id, user.email);
        }
        catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException(
                        'Crédentials déjà utilisées'
                    )
                }
            }
        }
       
       
    }

    async signout(){

        return 'im signout'
       
    }

    async signtoken(userID: number, email: string):Promise<{access_token:string}>{
        const payload = {
            sub: userID,
            email,
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: secret
        });

        return  {
            access_token: token
        }
    }
}
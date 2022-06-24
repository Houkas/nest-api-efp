import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({

})
export class AuthService{
    constructor(private prisma: PrismaService){
        
    }
    login(){
        return {
            msg: "i'm signin"
        }
    }

    signup(dto: AuthDto){
        return 'Je suis inscrit'
    }

    logout(){

    }
}
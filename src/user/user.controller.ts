import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
    @Get('me')
    getme(){
        return 'user info'
    }
}

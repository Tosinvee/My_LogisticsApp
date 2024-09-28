/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async getAllUsers(){
        return this.userService.getAllUser()
    }

    @Get(':id')
    async getUserById(@Param('id')  userId:string){
        return this.userService.getUserById(userId)
    }
}

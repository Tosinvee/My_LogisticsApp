/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async findByEmail(email:string){
        return this.userRepository.findOne({where: {email}})
    }

    async getAllUser(){
     const user = await this.userRepository.find()
     return user
    }

    async getUserById(userId:string){
        const user = await this.userRepository.findOne({where: {id:userId}})
        if(!user){
            throw new BadRequestException(`User with ${userId} not found`)
        }
        return user

    }
}

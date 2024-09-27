/* eslint-disable prettier/prettier */
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
 import { Users } from './interface/user';
import { SignUpDto } from './dtos/signUp.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private mailService: MailService,
        private userService:UserService,
        private readonly jwtService: JwtService,
        private configService: ConfigService,
    ){}

  async validateUser(email:string, password: string) : Promise< Users | null>{
    const user = await this.userService.findByEmail(email )

    if(user && (await bcrypt.compare(password, user.password)) ){
        if (!user.emailVerified){
            await this.sendOtp(user.email);
            throw new BadRequestException('Email not verified, OTP sent to email')
        }
        return {email: user.email, id: user.id, roles: [user.role]}
    }
  }  

  async sendOtp(email: string): Promise<{message: string}>{
    const otp = this.mailService.generateOtp(100000)
    const formattedOtp = await this.mailService.format(otp, 'OTP Verification')
    const fromAddress = this.configService.get<string>('mail.user');

    const result = await this.mailService.sendMail({
        from: fromAddress,
        to:email,
        subject:'OTP VERIFICATION',
        html: formattedOtp 
    })

    if (result === 'Error sending email'){
        throw new BadGatewayException('Error sending email')
    }
    await this.userRepository.update({email}, {verificationCode: otp, createdAt: new Date()})
    return {message: 'Otp sent to email'}
  }


  async signup(user:SignUpDto): Promise<{message: string}>{
    const existingUser = await this.userService.findByEmail(user.email)
    if(existingUser){
        throw new BadRequestException('User already exist')
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    await this.userRepository.save({
        email:user.email,
        password:hashedPassword
    })

    return await this.sendOtp(user.email)
  }

  async verifyEmail(email:string, otp:string):Promise<{message:string; access_token: string;}>{
    const user = await this.userService.findByEmail(email)
    if(user.verificationCode === otp && this.mailService.verifyOtpTime(user.createdAt)){
      await this.userRepository.update({email}, {emailVerified: true})
    
    const payload = {email:user.email, sub:user.id, roles: [user.role]}
    return{
      message:'Email verified sucessfully',
      access_token:this.jwtService.sign(payload)
    }
  }
  throw new BadRequestException('Invalid otp')
  }

  async login(user: Users){
    const payload ={email:user.email, sub: user.id, roles: user.roles}
      return{
        access_token:this.jwtService.sign(payload)
      }
    }
  }
  





/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService:AuthService){}
   
   @Post('signup')
   public async signup(@Body() signUpDto:SignUpDto){
    return this.authService.signup(signUpDto)
   }

   @Post('verify-email')
   public async verifyEmail(@Body() dto:{email:string; otp:string} ){
      return this.authService.verifyEmail(dto.email, dto.otp)
   }


   @Post('login')
   @UseGuards(LocalAuthGuard)
   public async login(@Request() req:any){
      return this.authService.login(req.user)
   }
}

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
   login(@Request() req:any){
      return this.authService.login(req.user)
   }

   @Post('forgot-password')
    async forgotPassword(@Body() dto: {email:string}){
      return this.authService.forgotPassword(dto.email)
    }

    @Post('verify-otp')
  async verifyOtp(@Body() dto:{email:string, otp:string}){
    return this.authService.verifyOtp(dto.email, dto.otp)
  }

  @Post('reset-password')
  async resetPassword(@Body() dto:{email:string, password:string}){
   return this.authService.resetPassword(dto.email, dto.password)
  }
}

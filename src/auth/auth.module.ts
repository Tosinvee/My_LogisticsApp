/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
// import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  providers: [AuthService,JwtStrategy, LocalStrategy ],
  controllers: [AuthController],
  imports:[TypeOrmModule.forFeature([User]), 
  forwardRef(()=> UserModule),
  JwtModule.registerAsync(jwtConfig.asProvider()),
  MailModule
]
})
export class AuthModule {}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV


@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:!ENV ? '.env' : `.env.${ENV}`,
      load:[appConfig, databaseConfig],
      validationSchema: environmentValidation


    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({
        type:'postgres',
        //entities:[User],
        synchronize:configService.get('database.synchronize'),
        port:configService.get('database. port'),
        username:configService.get('database.user'),
        password:configService.get('database.password'),
        host:configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database:configService.get('database.name'),  
      })
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

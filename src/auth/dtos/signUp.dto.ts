/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(99)
    firstName:string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(99)
    lastname:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password:string
}
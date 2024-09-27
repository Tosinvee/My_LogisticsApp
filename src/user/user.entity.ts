/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'varchar',
        length:98,
        nullable:true
    })
    firstName: string;

    @Column({
        type:'varchar',
        length: 98,
        nullable:true

    })
    lastName: string;

    @Column({
        type:'varchar',
        length:98,
        nullable:true,
        unique:true
    })
    email:string;

    @Column({
        type: 'varchar',
        length: 98,
        nullable: false  
    })
    password:string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({nullable: true })
    verificationCode:string

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ default: 'USER' })
  role: string;
}
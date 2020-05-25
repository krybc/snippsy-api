import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserRepository } from './infrastructure/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserRepository
  ]
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelRepository } from './infrastructure/repository/label.repository';
import { Label } from './domain/label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Label])
  ],
  providers: [
    LabelRepository
  ]
})
export class LabelModule {}

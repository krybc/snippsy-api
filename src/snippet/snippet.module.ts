import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './domain/snippet.entity';
import { SnippetRepository } from './infrastructure/repository/snippet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet])
  ],
  providers: [
    SnippetRepository
  ]
})
export class SnippetModule {}

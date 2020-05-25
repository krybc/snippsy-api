import { Module } from '@nestjs/common';
import { postgresProvider } from './infrastructure/postgres/postgres.provider';

@Module({
  providers: [...postgresProvider],
  exports: [...postgresProvider]
})
export class CoreModule {}

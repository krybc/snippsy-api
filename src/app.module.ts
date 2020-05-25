import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { LabelModule } from './label/label.module';
import { SnippetModule } from './snippet/snippet.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EasyconfigModule } from 'nestjs-easyconfig';

@Module({
  imports: [
    CommonModule,
    CoreModule,
    LabelModule,
    SnippetModule,
    UserModule,
    EasyconfigModule.register({}),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

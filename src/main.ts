import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.env.baseDir = __dirname + "../";
process.env.appDir = __dirname;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console
  });
  await app.listen(3000);
}
bootstrap();

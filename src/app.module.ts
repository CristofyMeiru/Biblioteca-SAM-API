import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { validateEnv } from './config-env';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv }), CqrsModule.forRoot(), AuthModule, BookModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

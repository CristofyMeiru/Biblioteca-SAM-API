import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma.service';
import { BookController } from './book.controller';
import { bookCommandHandlers } from './commands';
import { bookQueryHandlers } from './queries';

@Module({
  controllers: [BookController],
  providers: [...bookCommandHandlers, ...bookQueryHandlers, PrismaService],
})
export class BookModule {}

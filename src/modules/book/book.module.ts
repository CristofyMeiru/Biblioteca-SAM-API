import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma.service';
import { BookController } from './book.controller';
import { bookCommandHandlers } from './commands';

@Module({
  controllers: [BookController],
  providers: [...bookCommandHandlers, PrismaService],
})
export class BookModule {}

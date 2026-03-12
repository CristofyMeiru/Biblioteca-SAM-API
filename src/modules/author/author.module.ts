import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma.service';
import { AuthorController } from './author.controller';
import { authorCommandHandlers } from './commands';

@Module({
  controllers: [AuthorController],
  providers: [PrismaService, ...authorCommandHandlers],
})
export class AuthorModule {}

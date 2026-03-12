import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/services/prisma.service';
import { AuthorController } from './author.controller';
import { authorCommandHandlers } from './commands';
import { authorQueryHandlers } from './queries';

@Module({
  controllers: [AuthorController],
  providers: [PrismaService, ...authorCommandHandlers, ...authorQueryHandlers],
})
export class AuthorModule {}

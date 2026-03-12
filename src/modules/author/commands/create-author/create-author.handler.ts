import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { CreateAuthorCommand } from './create-author.command';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateAuthorCommand) {
    const existing = await this.prisma.author.findFirst({
      where: { name: command.name },
    });

    if (existing) {
      throw new ConflictException(`Author "${command.name}" already exists`);
    }

    return this.prisma.author.create({
      data: { name: command.name },
    });
  }
}

import { Command } from '@nestjs/cqrs';
import { Author } from '@src/generated/prisma/client';

export class CreateAuthorCommand extends Command<Author> {
  constructor(public readonly name: string) {
    super();
  }
}

import { Query } from '@nestjs/cqrs';
import { Author } from '@src/generated/prisma/client';

export class FindByIdQuery extends Query<Author> {
  constructor(public readonly id: string) {
    super();
  }
}

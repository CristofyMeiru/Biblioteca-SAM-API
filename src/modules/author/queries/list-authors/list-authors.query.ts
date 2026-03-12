// queries/list/list.query.ts
import { Query } from '@nestjs/cqrs';
import { Author } from '@src/generated/prisma/client';

export class ListAuthorsQuery extends Query<{ data: Author[]; total: number }> {
  constructor(
    public readonly s?: string,
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {
    super();
  }
}

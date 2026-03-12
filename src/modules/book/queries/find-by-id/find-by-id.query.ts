import { Query } from '@nestjs/cqrs';
import { BookWithAuthorEntity } from '@src/common/entities/book.entity';

export class FindByIdQuery extends Query<BookWithAuthorEntity> {
  constructor(public readonly id: string) {
    super();
  }
}

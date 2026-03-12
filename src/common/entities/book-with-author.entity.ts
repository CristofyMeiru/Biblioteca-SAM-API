import { ApiProperty } from '@nestjs/swagger';
import { Author } from '.';
import { AuthorEntity } from './author.entity';
import { BookEntity } from './book.entity';

export class BookWithAuthorEntity extends BookEntity {
  @ApiProperty({ type: AuthorEntity })
  author: Author;
}

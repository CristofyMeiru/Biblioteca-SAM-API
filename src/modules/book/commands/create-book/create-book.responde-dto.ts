import { ApiProperty } from '@nestjs/swagger';
import * as Entity from '@src/common/entities/';

export class CreateBookResponseDto {
  @ApiProperty({ type: Entity.Book })
  book: Entity.Book;

  @ApiProperty({ type: Entity.Author })
  author: Entity.Author;
}

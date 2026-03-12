import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Book } from '@src/generated/prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { AuthorEntity } from './author.entity';

export class BookEntity implements Book {
  @ApiProperty({ example: '01932b4a-1234-7000-8000-000000000000' })
  @IsUUID(7)
  id: string;

  @ApiProperty({ example: 'dom casmurro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'editora ática' })
  @IsString()
  @IsNotEmpty()
  publisher: string;

  @ApiProperty({ example: 'romance' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({ example: 'doação' })
  @IsString()
  @IsNotEmpty()
  acquisitionMethod: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  loanedQuantity: number;

  @ApiPropertyOptional({ example: 'livro' })
  @IsString()
  @IsOptional()
  materialType: string | null;

  @ApiPropertyOptional({ example: 256 })
  @IsInt()
  @Min(1)
  @IsOptional()
  pagesQuantity: number | null;

  @ApiPropertyOptional({ example: '978-3-16-148410-0' })
  @IsString()
  @IsOptional()
  isbn: string | null;

  @ApiPropertyOptional({ example: '869.93' })
  @IsString()
  @IsOptional()
  cddOrCdu: string | null;

  @ApiPropertyOptional({ example: '12345' })
  @IsString()
  @IsOptional()
  tombo: string | null;

  @ApiPropertyOptional({ example: '2ª edição' })
  @IsString()
  @IsOptional()
  edition: string | null;

  @ApiProperty({ example: '01932b4a-1234-7000-8000-000000000000' })
  @IsUUID(7)
  authorId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

export class BookWithAuthorEntity extends BookEntity {
  @ApiProperty({ type: AuthorEntity })
  author: AuthorEntity;
}

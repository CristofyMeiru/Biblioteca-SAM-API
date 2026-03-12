import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Dom Casmurro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Editora Ática' })
  @IsString()
  @IsNotEmpty()
  publisher: string;

  @ApiProperty({ example: 'Romance' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({ example: 'Doação' })
  @IsString()
  @IsNotEmpty()
  acquisitionMethod: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'uuid-do-author' })
  @IsUUID(7)
  @IsNotEmpty()
  authorId: string;

  @ApiPropertyOptional({ example: 'Livro' })
  @IsString()
  @IsOptional()
  materialType?: string;

  @ApiPropertyOptional({ example: 256 })
  @IsInt()
  @Min(1)
  @IsOptional()
  pagesQuantity?: number;

  @ApiPropertyOptional({ example: '978-3-16-148410-0' })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiPropertyOptional({ example: '869.93' })
  @IsString()
  @IsOptional()
  cddOrCdu?: string;

  @ApiPropertyOptional({ example: '12345' })
  @IsString()
  @IsOptional()
  tombo?: string;

  @ApiPropertyOptional({ example: '2ª edição' })
  @IsString()
  @IsOptional()
  edition?: string;
}

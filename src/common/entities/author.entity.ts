import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@src/generated/prisma/client';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AuthorEntity implements Author {
  @ApiProperty({ example: '01932b4a-1234-7000-8000-000000000000' })
  @IsUUID(7)
  id: string;

  @ApiProperty({ example: 'machado de assis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}

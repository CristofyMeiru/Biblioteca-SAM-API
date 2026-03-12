import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, Min } from 'class-validator';
import { AuthorEntity } from '../entities';

export function PaginatedMetadata<T>(classRef: new () => T) {
  class PaginatedEntityClass {
    @ApiProperty({ type: [classRef] })
    @IsArray()
    data: T[];

    @ApiProperty({ example: 100 })
    @IsInt()
    @Min(0)
    total: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    page: number;

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    limit: number;
  }

  return PaginatedEntityClass;
}



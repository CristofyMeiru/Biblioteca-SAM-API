import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class BulkDeleteDto {
  @ApiProperty({ example: ['01932b4a-1234-7000-8000-000000000000'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID(7, { each: true })
  ids: string[];
}

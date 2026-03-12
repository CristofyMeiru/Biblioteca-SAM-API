// queries/find-by-id/find-by-id.params.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindByIdParamsDto {
  @ApiProperty({ example: '01932b4a-1234-7000-8000-000000000000' })
  @IsUUID(7)
  id: string;
}

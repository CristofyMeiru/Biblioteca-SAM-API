// common/entities/bulk-delete.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class BulkDeleteResponseDto {
  @ApiProperty({ example: 'Todos os [entity] foram deletados com sucesso' })
  @IsString()
  message: string;

  @ApiPropertyOptional({
    example: ['01932b4a-1234-7000-8000-000000000000'],
  })
  @IsArray()
  @IsUUID(7, { each: true })
  @IsOptional()
  notFound?: string[];
}

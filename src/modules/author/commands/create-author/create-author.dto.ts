import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'machado de assis' })
  @Transform(({ value }) => value?.toLowerCase?.())
  @IsString()
  @IsNotEmpty()
  name: string;
}

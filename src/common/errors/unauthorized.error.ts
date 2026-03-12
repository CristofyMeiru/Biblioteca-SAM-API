import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UnauthorizedEntity {
  @ApiProperty({ example: 'UNAUTHORIZED' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Unauthorized' })
  @IsString()
  message: string;
}

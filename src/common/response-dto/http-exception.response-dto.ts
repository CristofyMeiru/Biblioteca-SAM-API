import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class HttpExceptionResponseDto {
  @ApiProperty({ example: 400 })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ example: 'Bad request' })
  @IsString()
  message: string;
}

import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Permissions } from '../auth/decorators/permissions.decorator';
import * as CreateBook from './commands/create-book';

@Controller('book')
export class BookController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiCreatedResponse({ type: CreateBook.Response })
  @ApiOperation({ description: 'Add a new book to library' })
  @Permissions({ scope: 'admin', resource: 'book', action: ['create'] })
  @Post()
  create(@Body() body: CreateBook.Dto) {
    const command = plainToInstance(CreateBook.Command, body);
    return this.commandBus.execute(command);
  }
}

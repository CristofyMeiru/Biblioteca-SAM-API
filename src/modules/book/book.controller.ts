import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BookWithAuthorEntity } from '@src/common/entities/book.entity';
import { plainToInstance } from 'class-transformer';
import { HasPermissionGuard } from '../auth/application/has-permission.guard';
import { AllowAnonymous } from '../auth/decorators/auth.decorators';
import { Permissions } from '../auth/decorators/permissions.decorator';
import * as CreateBook from './commands/create-book';
import * as FindById from './queries/find-by-id';

@UseGuards(HasPermissionGuard)
@Controller('books')
export class BookController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiCreatedResponse({ type: CreateBook.Response })
  @ApiOperation({ description: 'Add a new book to library' })
  @Permissions({ scope: 'admin', resource: 'book', action: ['create'] })
  @Post()
  create(@Body() body: CreateBook.Dto) {
    const command = plainToInstance(CreateBook.Command, body);
    return this.commandBus.execute(command);
  }

  @AllowAnonymous()
  @ApiOperation({ description: 'Find book by id' })
  @ApiOkResponse({ type: BookWithAuthorEntity })
  @Get(':id')
  findById(@Param() params: FindById.ParamsDto) {
    const query = plainToInstance(FindById.Query, params);
    return this.queryBus.execute(query);
  }
}

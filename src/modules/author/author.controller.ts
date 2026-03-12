import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthorEntity } from '@src/common/entities/author.entity';
import { BulkDeleteResponseDto } from '@src/common/response-dto/bulk-delete.response-dto';
import { plainToInstance } from 'class-transformer';
import { HasPermissionGuard } from '../auth/application/has-permission.guard';
import { AllowAnonymous } from '../auth/decorators/auth.decorators';
import { Permissions } from '../auth/decorators/permissions.decorator';
import * as BulkDelete from './commands/bulk-delete';
import * as CreateAuthor from './commands/create-author';
import * as FindById from './queries/find-by-id';
import * as ListAuthors from './queries/list-authors';
import { PaginatedAuthorEntity } from './queries/list-authors/list-authors.response-dto';

@UseGuards(HasPermissionGuard)
@Controller('authors')
export class AuthorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Permissions({ scope: 'admin', resource: 'author', action: ['create'] })
  @ApiOperation({ description: 'Create a new author' })
  @ApiCreatedResponse({ type: AuthorEntity })
  @Post()
  async create(@Body() body: CreateAuthor.Dto) {
    const command = plainToInstance(CreateAuthor.Command, body);
    return this.commandBus.execute(command);
  }

  @AllowAnonymous()
  @ApiOperation({ description: 'List authors' })
  @ApiOkResponse({ type: PaginatedAuthorEntity })
  @Get()
  list(@Query() queryParams: ListAuthors.QueryParamsDto) {
    const query = plainToInstance(ListAuthors.Query, queryParams);
    return this.queryBus.execute(query);
  }

  @AllowAnonymous()
  @ApiOperation({ description: 'Find author by id' })
  @ApiOkResponse({ type: AuthorEntity })
  @Get(':id')
  findById(@Param() params: FindById.ParamsDto) {
    const query = plainToInstance(FindById.Query, params);
    return this.queryBus.execute(query);
  }

  @Permissions({ scope: 'admin', resource: 'author', action: ['delete'] })
  @ApiOperation({ description: 'Bulk delete authors' })
  @ApiOkResponse({ type: BulkDeleteResponseDto })
  @Delete()
  bulkDelete(@Body() body: BulkDelete.Dto) {
    const command = plainToInstance(BulkDelete.Command, body);
    return this.commandBus.execute(command);
  }
}

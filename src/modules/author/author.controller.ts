// author.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthorEntity } from '@src/common/entities/author.entity';
import { plainToInstance } from 'class-transformer';
import { HasPermissionGuard } from '../auth/application/has-permission.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import * as CreateAuthor from './commands/create-author';

@UseGuards(HasPermissionGuard)
@Controller('authors')
export class AuthorController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: 'Create a new author' })
  @ApiCreatedResponse({ type: AuthorEntity })
  @Permissions({ scope: 'admin', resource: 'author', action: ['create'] })
  @Post()
  async create(@Body() body: CreateAuthor.Dto) {
    const command = plainToInstance(CreateAuthor.Command, body);
    return this.commandBus.execute(command);
  }
}

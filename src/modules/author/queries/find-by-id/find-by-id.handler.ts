import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { FindByIdQuery } from './find-by-id.query';

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindByIdQuery) {
    const author = await this.prisma.author.findUnique({
      where: { id: query.id },
    });

    if (!author) {
      throw new NotFoundException(`Author not found`);
    }

    return author;
  }
}

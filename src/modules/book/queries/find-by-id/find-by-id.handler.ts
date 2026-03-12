// queries/find-by-id/find-by-id.handler.ts
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { FindByIdQuery } from './find-by-id.query';

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindByIdQuery) {
    const book = await this.prisma.book.findUnique({
      where: { id: query.id },
      include: { author: true },
    });

    if (!book) {
      throw new NotFoundException(`Livro não encontrado.`);
    }

    return book;
  }
}

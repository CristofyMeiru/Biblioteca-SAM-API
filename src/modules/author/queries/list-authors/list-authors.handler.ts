import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { ListAuthorsQuery } from './list-authors.query';

@QueryHandler(ListAuthorsQuery)
export class ListAuthorsHandler implements IQueryHandler<ListAuthorsQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListAuthorsQuery) {
    const { s, page, limit } = query;
    const skip = (page - 1) * limit;

    const where = s ? { name: { contains: s, mode: 'insensitive' as const } } : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.author.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.author.count({ where }),
    ]);

    return { data, total, page, limit };
  }
}

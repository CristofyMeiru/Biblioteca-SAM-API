import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { BookBulkDeleteResult, BulkDeleteCommand } from './bulk-delete.command';

@CommandHandler(BulkDeleteCommand)
export class BulkDeleteHandler implements ICommandHandler<BulkDeleteCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: BulkDeleteCommand): Promise<BookBulkDeleteResult> {
    const { ids } = command;

    const existing = await this.prisma.book.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    const foundIds = existing.map((b) => b.id);
    const notFoundIds = ids.filter((id) => !foundIds.includes(id));

    await this.prisma.book.deleteMany({
      where: { id: { in: foundIds } },
    });

    if (notFoundIds.length === 0) {
      return { message: 'All books deleted successfully' };
    }

    return {
      message: `${foundIds.length} of ${ids.length} books deleted successfully`,
      notFound: notFoundIds,
    };
  }
}

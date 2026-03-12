import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { BulkDeleteCommand } from './bulk-delete.command';

@CommandHandler(BulkDeleteCommand)
export class BulkDeleteHandler implements ICommandHandler<BulkDeleteCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: BulkDeleteCommand) {
    const { ids } = command;

    const existing = await this.prisma.author.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    const foundIds = existing.map((a) => a.id);
    const notFoundIds = ids.filter((id) => !foundIds.includes(id));

    await this.prisma.author.deleteMany({
      where: { id: { in: foundIds } },
    });

    if (notFoundIds.length === 0) {
      return { message: 'All authors deleted successfully' };
    }

    return {
      message: `${foundIds.length} of ${ids.length} authors deleted successfully`,
      notFound: notFoundIds,
    };
  }
}

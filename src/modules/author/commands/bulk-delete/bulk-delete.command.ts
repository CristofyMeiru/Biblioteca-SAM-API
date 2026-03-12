import { Command } from '@nestjs/cqrs';

export class BulkDeleteCommand extends Command<{ notFound?: string[]; message: string }> {
  constructor(public readonly ids: string[]) {
    super();
  }
}

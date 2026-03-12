import { Command } from '@nestjs/cqrs';

export interface BookBulkDeleteResult {
  message: string;
  notFound?: string[];
}

export class BulkDeleteCommand extends Command<BookBulkDeleteResult> {
  constructor(public readonly ids: string[]) {
    super();
  }
}

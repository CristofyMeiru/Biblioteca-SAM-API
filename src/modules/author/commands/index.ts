import { BulkDeleteHandler } from './bulk-delete';
import { CreateAuthorHandler } from './create-author';

export const authorCommandHandlers = [CreateAuthorHandler, BulkDeleteHandler];

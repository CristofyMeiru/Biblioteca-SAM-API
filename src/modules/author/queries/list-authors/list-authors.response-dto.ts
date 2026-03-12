import { AuthorEntity } from '@src/common/entities';
import { PaginatedMetadata } from '@src/common/utils/paginate-metadata';

export class PaginatedAuthorEntity extends PaginatedMetadata(AuthorEntity) {}

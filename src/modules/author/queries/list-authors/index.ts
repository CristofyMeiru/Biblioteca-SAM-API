// queries/list/index.ts
import { ListAuthorsQuery } from './list-authors.query';
import { ListAuthorsHandler } from './list-authors.handler';
import { ListAuthorsQueryParamsDto } from './list-authors.dto';

export {
  ListAuthorsQuery,
  ListAuthorsHandler,
  ListAuthorsQueryParamsDto,
  //
  ListAuthorsQuery as Query,
  ListAuthorsHandler as Handler,
  ListAuthorsQueryParamsDto as QueryParamsDto,
};

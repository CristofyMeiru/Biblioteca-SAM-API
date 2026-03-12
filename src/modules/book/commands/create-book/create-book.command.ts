import { Command } from '@nestjs/cqrs';
import { Author, Book } from '@src/generated/prisma/client';

export class CreateBookCommand extends Command<{ book: Omit<Book, 'authorId'>; author: Author }> {
  constructor(
    public readonly title: string,
    public readonly publisher: string,
    public readonly genre: string,
    public readonly acquisitionMethod: string,
    public readonly quantity: number,
    public readonly authorId: string,
    public readonly materialType?: string,
    public readonly pagesQuantity?: number,
    public readonly isbn?: string,
    public readonly cddOrCdu?: string,
    public readonly tombo?: string,
    public readonly edition?: string,
  ) {
    super();
  }
}

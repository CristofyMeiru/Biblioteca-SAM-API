import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@src/shared/services/prisma.service';
import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateBookCommand) {
    const author = await this.prisma.author.findUnique({
      where: { id: command.authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with id ${command.authorId} not found`);
    }

    const existingBook = await this.prisma.book.findFirst({
      where: {
        title: command.title,
        authorId: command.authorId,
      },
    });

    if (existingBook) {
      throw new ConflictException(`Book "${command.title}" already exists for this author`);
    }

    const createdBook = await this.prisma.book.create({
      data: {
        title: command.title,
        publisher: command.publisher,
        genre: command.genre,
        acquisitionMethod: command.acquisitionMethod,
        quantity: command.quantity,
        authorId: command.authorId,
        materialType: command.materialType,
        pagesQuantity: command.pagesQuantity,
        isbn: command.isbn,
        cddOrCdu: command.cddOrCdu,
        tombo: command.tombo,
        edition: command.edition,
      },
      omit: { authorId: true },
    });

    return { book: createdBook, author };
  }
}

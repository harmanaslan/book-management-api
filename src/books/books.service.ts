import { Injectable, NotFoundException } from '@nestjs/common';
import type { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class BooksService {
  private readonly filePath = join(process.cwd(), 'data', 'books.json');

  private readBooks(): Book[] {
    const data = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeBooks(books: Book[]): void {
    writeFileSync(this.filePath, JSON.stringify(books, null, 2));
  }

  findAll(): Book[] {
    return this.readBooks();
  }

  findOne(id: string): Book {
    const books = this.readBooks();

    const book = books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const books = this.readBooks();

    const newBook: Book = {
      id: Date.now().toString(),
      ...createBookDto,
    };

    books.push(newBook);

    this.writeBooks(books);

    return newBook;
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    const books = this.readBooks();

    const book = books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const updatedBook: Book = {
      ...book,
      ...updateBookDto,
    };

    const updatedBooks = books.map((book) =>
      book.id === id ? updatedBook : book,
    );

    this.writeBooks(updatedBooks);

    return updatedBook;
  }

  remove(id: string): { message: string } {
    const books = this.readBooks();

    const book = books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    const filteredBooks = books.filter((book) => book.id !== id);

    this.writeBooks(filteredBooks);

    return {
      message: `Book with id ${id} deleted successfully`,
    };
  }
}
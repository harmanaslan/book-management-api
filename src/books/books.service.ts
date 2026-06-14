import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import type { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBooksDto } from './dto/filter-books.dto';
import { APP_CONSTANTS } from '../commons/constants/app.constants';

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

findAll(filters: FilterBooksDto) {
const books = this.readBooks();


const page = filters.page ?? APP_CONSTANTS.DEFAULT_PAGE;
const limit = filters.limit ?? APP_CONSTANTS.DEFAULT_LIMIT;

let filteredBooks = books;

if (filters.genre) {
  filteredBooks = filteredBooks.filter((book) =>
    book.genre.toLowerCase().includes(filters.genre!.toLowerCase()),
  );
}

if (filters.author) {
  filteredBooks = filteredBooks.filter((book) =>
    book.author.toLowerCase().includes(filters.author!.toLowerCase()),
  );
}

if (filters.createdBy) {
  filteredBooks = filteredBooks.filter((book) =>
    book.createdBy.toLowerCase().includes(filters.createdBy!.toLowerCase()),
  );
}

const total = filteredBooks.length;
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;

const data = filteredBooks.slice(startIndex, endIndex);

return {
  data,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
};


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

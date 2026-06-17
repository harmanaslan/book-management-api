import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBooksDto } from './dto/filter-books.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { APP_CONSTANTS } from '../commons/constants/app.constants';
import type { PaginatedResponse } from '../commons/interfaces/paginated-response.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  async findAll(
    filters: FilterBooksDto,
  ): Promise<PaginatedResponse<BookDocument>> {
    const query: Record<string, unknown> = {};

    const page = filters.page ?? APP_CONSTANTS.DEFAULT_PAGE;
    const limit = filters.limit ?? APP_CONSTANTS.DEFAULT_LIMIT;

    if (filters.genre) {
      query.genre = { $regex: filters.genre, $options: 'i' };
    }

    if (filters.author) {
      query.author = { $regex: filters.author, $options: 'i' };
    }

    if (filters.createdBy) {
      query.createdBy = { $regex: filters.createdBy, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.bookModel.find(query).skip(skip).limit(limit).exec(),
      this.bookModel.countDocuments(query).exec(),
    ]);

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

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    return this.bookModel.create(createBookDto);
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDocument> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async remove(id: string): Promise<{ message: string }> {
    const book = await this.bookModel.findByIdAndDelete(id).exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return {
      message: `Book with id ${id} deleted successfully`,
    };
  }
}

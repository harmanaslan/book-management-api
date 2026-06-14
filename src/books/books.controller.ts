import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import type { Book } from './entities/book.entity';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { FilterBooksDto } from './dto/filter-books.dto';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Get()
    findAll(@Query() filterBooksDto: FilterBooksDto) {
      return this.booksService.findAll(filterBooksDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Book {
      return this.booksService.findOne(id);
    }
  
    @Post()
    create(@Body() createBookDto: CreateBookDto): Book {
      return this.booksService.create(createBookDto);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateBookDto: UpdateBookDto,
    ): Book {
      return this.booksService.update(id, updateBookDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): { message: string } {
      return this.booksService.remove(id);
    }
  }
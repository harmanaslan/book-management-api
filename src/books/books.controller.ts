import {Body,Controller,Delete,Get,HttpCode,HttpStatus,Param,Patch,Post,Query,} from '@nestjs/common';
  import { BooksService } from './books.service';
  import type { Book } from './entities/book.entity';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { FilterBooksDto } from './dto/filter-books.dto';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() filterBooksDto: FilterBooksDto) {
      return this.booksService.findAll(filterBooksDto);
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string): Book {
      return this.booksService.findOne(id);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createBookDto: CreateBookDto): Book {
      return this.booksService.create(createBookDto);
    }
    
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(
      @Param('id') id: string,
      @Body() updateBookDto: UpdateBookDto,
    ): Book {
      return this.booksService.update(id, updateBookDto);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string): { message: string } {
      return this.booksService.remove(id);
    }
  }
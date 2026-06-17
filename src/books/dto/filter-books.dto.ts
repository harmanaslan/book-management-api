import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../commons/dto/pagination-query.dto';

export class FilterBooksDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'Fantasy' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ example: 'J.R.R. Tolkien' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  createdBy?: string;
}

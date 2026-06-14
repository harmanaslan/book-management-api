import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../commons/dto/pagination-query.dto';

export class FilterBooksDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
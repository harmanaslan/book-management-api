import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Robert C. Martin' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 2008 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: 'Software Engineering' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

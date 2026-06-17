import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Prepare API documentation' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Add Swagger decorators to all DTOs' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '65f1a2b3c4d5e6f789012345' })
  @IsMongoId()
  projectId: string;

  @ApiProperty({ example: '65f1a2b3c4d5e6f789012346' })
  @IsMongoId()
  assignedTo: string;
}

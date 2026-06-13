import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsMongoId()
  projectId: string;

  @IsMongoId()
  assignedTo: string;
}
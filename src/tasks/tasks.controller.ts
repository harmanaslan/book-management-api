import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import type { TaskDocument } from './schemas/task.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { ParseObjectIdPipe } from '../commons/pipes/parse-object-id.pipe';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: Request,
  ): Promise<TaskDocument> {
    const user = request['user'];

    return this.tasksService.create(createTaskDto, user.sub);
  }

  @Get('my-tasks')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  findMyTasks(@Req() request: Request): Promise<TaskDocument[]> {
    const user = request['user'];

    return this.tasksService.findMyTasks(user.sub);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Req() request: Request,
  ): Promise<TaskDocument> {
    const user = request['user'];

    return this.tasksService.updateStatus(id, user.sub, updateTaskStatusDto);
  }
}

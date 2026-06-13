import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import type { Request } from 'express';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../users/schemas/user.schema';
  
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
      const user = request['user'];
  
      return this.tasksService.create(createTaskDto, user.sub);
    }
  
    @Get('my-tasks')
    @UseGuards(JwtAuthGuard)
    findMyTasks(@Req() request: Request) {
      const user = request['user'];
  
      return this.tasksService.findMyTasks(user.sub);
    }
  
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    updateStatus(
      @Param('id') id: string,
      @Body() updateTaskStatusDto: UpdateTaskStatusDto,
      @Req() request: Request,
    ) {
      const user = request['user'];
  
      return this.tasksService.updateStatus(id, user.sub, updateTaskStatusDto);
    }
  }
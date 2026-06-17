import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectsService } from '../projects/projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    adminId: string,
  ): Promise<TaskDocument> {
    const project = await this.projectsService.findById(
      createTaskDto.projectId,
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const task = await this.taskModel.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      project: new Types.ObjectId(createTaskDto.projectId),
      assignedTo: new Types.ObjectId(createTaskDto.assignedTo),
      createdBy: new Types.ObjectId(adminId),
    });

    return task;
  }

  async findMyTasks(userId: string): Promise<TaskDocument[]> {
    return await this.taskModel
      .find({
        assignedTo: new Types.ObjectId(userId),
      })
      .populate('project', 'name description')
      .populate('assignedTo', 'name email role')
      .populate('createdBy', 'name email role');
  }

  async updateStatus(
    taskId: string,
    userId: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskDocument> {
    const task = await this.taskModel.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.assignedTo.toString() !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    task.status = updateTaskStatusDto.status;

    return task.save();
  }
}

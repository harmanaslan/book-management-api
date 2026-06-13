import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto, adminId: string) {
    const project = await this.projectModel.create({
      ...createProjectDto,
      createdBy: new Types.ObjectId(adminId),
    });

    return project;
  }

  async findAll() {
    return this.projectModel.find().populate('createdBy', 'name email role');
  }

  async findById(projectId: string) {
    return this.projectModel.findById(projectId);
  }
}
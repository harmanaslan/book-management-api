import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserData: CreateUserData): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({
      email: createUserData.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const createdUser = await this.userModel.create(createUserData);

    return createdUser;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
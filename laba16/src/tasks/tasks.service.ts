import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: number,
  ): Promise<Task> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });

    return this.tasksRepository.save(newTask);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    await this.tasksRepository.update(id, updateTaskDto);

    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);

    return result.affected === 1;
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}

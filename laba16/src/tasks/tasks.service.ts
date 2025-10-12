import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  getAllTasks() {
    return this.prisma.task.findMany({ include: { user: true } });
  }

  getTaskById(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createTaskDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id=${createTaskDto.userId} not found`,
      );
    }

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        user: { connect: { id: createTaskDto.userId } },
      },
    });
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        completed: updateTaskDto.completed,
      },
    });
  }

  async deleteTask(id: number) {
    const deleted = await this.prisma.task.delete({ where: { id } });

    if (!deleted) {
      throw new NotFoundException(`Task with id=${id} not found`);
    }

    return true;
  }

  getTasksByUserId(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { user: false },
    });
  }
}

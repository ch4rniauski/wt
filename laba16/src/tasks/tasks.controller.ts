import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task, User } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<(Task & { user: User })[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task & { user: User }> {
    const task = await this.tasksService.getTaskById(Number(id));

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksService.updateTask(Number(id), updateTaskDto);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const success = await this.tasksService.deleteTask(Number(id));

    if (!success) {
      throw new NotFoundException('Task not found');
    }

    return { deleted: true };
  }

  @Get('users/:userId')
  getTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return this.tasksService.getTasksByUserId(Number(userId));
  }
}

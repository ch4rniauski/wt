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

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(Number(id));

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto & { userId: number }) {
    return await this.tasksService.createTask(
      createTaskDto,
      createTaskDto.userId,
    );
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(Number(id), updateTaskDto);

    if (!task) {
      throw new NotFoundException('Task is not found');
    }

    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const success = await this.tasksService.deleteTask(Number(id));

    if (!success) {
      throw new NotFoundException('Task is not found');
    }

    return { deleted: true };
  }

  @Get('users/:userId')
  async getTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.getTasksByUser(Number(userId));
  }
}

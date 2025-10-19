import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles-guard';
import { TasksServiceRepository } from './tasks.service-repo';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksServiceRepository) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['user'])
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(Number(id));

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksService.update(Number(id), updateTaskDto);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const success = await this.tasksService.delete(Number(id));

    if (!success) {
      throw new NotFoundException('Task not found');
    }

    return { deleted: true };
  }

  @Get('users/:userId')
  getTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return this.tasksService.getTasksByUser(Number(userId));
  }
}

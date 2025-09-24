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
  private readonly tasksService: TasksService;

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(Number(id));

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
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.updateTask(Number(id), updateTaskDto);

    if (!task) {
      throw new NotFoundException('Task is not found');
    }

    return task;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    const success = this.tasksService.deleteTask(Number(id));

    if (!success) {
      throw new NotFoundException('Task is not found');
    }

    return { deleted: true };
  }
}

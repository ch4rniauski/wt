import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.idCounter++,
      title: createTaskDto.title,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task | undefined {
    const task = this.getTaskById(id);

    if (task) {
      task.title = updateTaskDto.title;
      task.completed = updateTaskDto.completed;
    }

    return task;
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);

      return true;
    }

    return false;
  }
}

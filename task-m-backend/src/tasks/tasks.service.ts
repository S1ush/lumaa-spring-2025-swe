import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: number, createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId: userId.toString(), // Convert to string since userId in Task model is string
      },
    });
    return task;
  }

  async getAllTasks(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId.toString(),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tasks;
  }

  async updateTask(userId: number, taskId: string, updateTaskDto: UpdateTaskDto) {
    // First check if task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId.toString()) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
    });
  }

  async deleteTask(userId: number, taskId: string) {
    // First check if task exists and belongs to user
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId.toString()) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted successfully' };
  }
}

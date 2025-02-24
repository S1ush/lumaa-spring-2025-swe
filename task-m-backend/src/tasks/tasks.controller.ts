import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetCurrentUserId, Public } from 'common/decorators';

@Controller('tasks')
export class TasksController {
  constructor(private  tasksService: TasksService) {

  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(
    @GetCurrentUserId() userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(userId, createTaskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTasks(@GetCurrentUserId() userId: number) {
    return this.tasksService.getAllTasks(userId);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  updateTask(
    @GetCurrentUserId() userId: number,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
        console.log('put call', taskId)
    return this.tasksService.updateTask(userId, taskId, updateTaskDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteTask(
    @GetCurrentUserId() userId: number,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.deleteTask(userId, taskId);
  }
}
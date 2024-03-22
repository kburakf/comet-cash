import { Request, Response } from 'express';

import { CreateTaskDto, UpdateTaskDto, TaskDto } from '../dto/task';
import * as TaskService from '../services/task';
import config from '../config';

export async function createTask(
  req: Request,
  res: Response
): Promise<Response> {
  const task: CreateTaskDto = req.body;

  try {
    const createdTask: TaskDto = await TaskService.createTask(task);

    return res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);

    return res.status(500).json({ message: error.message });
  }
}

export async function updateTask(
  req: Request,
  res: Response
): Promise<Response> {
  const taskId: string = req.params.taskId;
  const taskUpdate: UpdateTaskDto = req.body;

  try {
    if (Object.keys(taskUpdate).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty.' });
    }

    const updatedTask: TaskDto = await TaskService.updateTask(
      taskId,
      taskUpdate
    );

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);

    return res.status(404).json({ message: error.message });
  }
}

export async function deleteTask(
  req: Request,
  res: Response
): Promise<Response> {
  const taskId: string = req.params.taskId;

  try {
    const response = await TaskService.deleteTask(taskId);

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting task:', error);

    return res.status(404).json({ message: error.message });
  }
}

export async function getTasks(req: Request, res: Response): Promise<Response> {
  let limit: number =
    parseInt(req.query.limit as string) || config.pagination.defaultLimit;

  limit = Math.min(limit, config.pagination.maxLimit);

  let offset: number =
    parseInt(req.query.offset as string) || config.pagination.defaultOffset;
  offset = Math.max(offset, config.pagination.defaultOffset);

  const tasks: TaskDto[] = await TaskService.getTasks(limit, offset);

  return res.status(200).json(tasks);
}

export async function simulate(req: Request, res: Response): Promise<Response> {
  try {
    await TaskService.simulate();

    return res.status(200).json({ message: 'Simulation ended' });
  } catch (error) {
    console.error('Error simulating task:', error);

    return res.status(500).json({ message: error.message });
  }
}

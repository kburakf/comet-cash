import { CreateTaskDto, UpdateTaskDto } from 'dto/task';
import Task from '../models/task';

export const createTask = async (task: CreateTaskDto) => {
  return (await Task.create(task)).toJSON();
};

export const findTaskById = async (taskId: string) => {
  return await Task.findById(taskId).lean();
};

export const updateTask = async (taskId: string, taskData: UpdateTaskDto) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true }).lean();
};

export const deleteTask = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId).lean();
};

export const findAllTasks = async (limit: number, offset: number) => {
  return await Task.find().skip(offset).limit(limit).lean();
};

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as TaskDao from '../../dao/task';
import * as TaskService from '../../services/task';
import { TaskStatus } from '../../enums/status';

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  await mongoServer.start();

  const mongoUri = await mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();

  await mongoServer.stop();
});

jest.mock('../../dao/task', () => ({
  createTask: jest.fn(),
  updateTask: jest.fn(),
  findTaskById: jest.fn(),
  deleteTask: jest.fn(),
  findAllTasks: jest.fn(),
}));

describe('TaskService', () => {
  const taskId = new mongoose.Types.ObjectId().toString();
  const taskData = {
    title: 'Title',
    description: 'Description',
    status: TaskStatus.CREATED,
  };

  describe('createTask', () => {
    it('should create a task with a CREATED status', async () => {
      const taskData = { title: 'Test Task', description: 'Test Description' };
      const mockTaskId = new mongoose.Types.ObjectId();

      const mockedDaoResponse = {
        _id: mockTaskId,
        title: taskData.title,
        description: taskData.description,
        status: TaskStatus.CREATED,
      };

      (TaskDao.createTask as jest.Mock).mockResolvedValue(mockedDaoResponse);

      const result = await TaskService.createTask(taskData);

      expect(TaskDao.createTask).toHaveBeenCalledWith({
        ...taskData,
        status: TaskStatus.CREATED,
      });

      expect(result).toMatchObject({
        title: taskData.title,
        description: taskData.description,
        status: TaskStatus.CREATED,
      });

      expect(typeof result.id).toBe('string');
    });

    it('should handle a simulated database failure on creation', async () => {
      (TaskDao.createTask as jest.Mock).mockRejectedValue(
        new Error('Simulated database failure')
      );

      await expect(TaskService.createTask(taskData)).rejects.toThrow(
        'Create task failed: Error: Simulated database failure'
      );
    });
  });

  describe('updateTask', () => {
    it('should update the task successfully', async () => {
      const updatedTaskData = { ...taskData, title: 'Updated Title' };

      const updatedTask = {
        _id: taskId,
        ...updatedTaskData,
      };

      (TaskDao.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      const result = await TaskService.updateTask(taskId, updatedTaskData);

      expect(TaskDao.updateTask).toHaveBeenCalledWith(taskId, updatedTaskData);
      expect(result).toEqual(expect.objectContaining(updatedTaskData));
    });

    it('should throw an error if the task does not exist', async () => {
      (TaskDao.updateTask as jest.Mock).mockResolvedValue(null);

      await expect(TaskService.updateTask(taskId, taskData)).rejects.toThrow(
        'Update task failed: Error: Task not found'
      );
    });

    it('should handle a simulated database failure on update', async () => {
      (TaskDao.updateTask as jest.Mock).mockRejectedValue(
        new Error('Simulated database failure')
      );

      await expect(TaskService.updateTask(taskId, taskData)).rejects.toThrow(
        'Update task failed: Error: Simulated database failure'
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete the task successfully', async () => {
      (TaskDao.findTaskById as jest.Mock).mockResolvedValue(taskData);

      (TaskDao.deleteTask as jest.Mock).mockResolvedValue(true);
      await expect(TaskService.deleteTask(taskId)).resolves.toEqual({
        message: 'Task deleted successfully',
      });
    });

    it('should throw an error if the task does not exist', async () => {
      (TaskDao.findTaskById as jest.Mock).mockResolvedValue(null);

      await expect(TaskService.deleteTask(taskId)).rejects.toThrow(
        'Delete task failed: Error: Task not found'
      );
    });
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const taskData = {
        title: 'Title',
        description: 'Description',
        status: 'Pending',
      };

      const tasksArray = [
        { _id: new mongoose.Types.ObjectId(), ...taskData },
        { _id: new mongoose.Types.ObjectId(), ...taskData, title: 'Title 2' },
      ];

      (TaskDao.findAllTasks as jest.Mock).mockResolvedValue(tasksArray);

      const results = await TaskService.getTasks(10, 0);

      expect(results.length).toBe(2);
      expect(results[0]).toMatchObject(
        expect.objectContaining({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
        })
      );
    });

    it('should handle a simulated database failure on retrieving tasks', async () => {
      (TaskDao.findAllTasks as jest.Mock).mockRejectedValue(
        new Error('Simulated database failure')
      );

      await expect(TaskService.getTasks(10, 0)).rejects.toThrow(
        'Get tasks failed: Error: Simulated database failure'
      );
    });
  });
});

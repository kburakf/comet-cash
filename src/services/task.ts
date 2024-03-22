import axios from 'axios';

import { ITask } from '../models/task';
import * as TaskDao from '../dao/task';
import { CreateTaskDto, TaskDto } from '../dto/task';
import { TaskStatus } from '../enums/status';

export const createTask = async (taskData: CreateTaskDto): Promise<TaskDto> => {
  const taskWithStatus = {
    ...taskData,
    status: TaskStatus.CREATED,
  };

  try {
    const createdTask: ITask = await dbCallWithSetTimeout(
      () => TaskDao.createTask(taskWithStatus),
      0.2,
      600
    );

    return transformTaskToDto(createdTask);
  } catch (error) {
    throw new Error(`Create task failed: ${error}`);
  }
};

export const updateTask = async (
  taskId: string,
  taskData: any
): Promise<TaskDto> => {
  try {
    const updatedTask = await dbCallWithSetTimeout(
      () => TaskDao.updateTask(taskId, taskData),
      0.1,
      700
    );

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
    };
  } catch (error) {
    throw new Error(`Update task failed: ${error}`);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const task = await TaskDao.findTaskById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    await dbCallWithSetTimeout(() => TaskDao.deleteTask(taskId), 0.3, 400);

    return { message: 'Task deleted successfully' };
  } catch (error) {
    throw new Error(`Delete task failed: ${error}`);
  }
};

export const getTasks = async (
  limit: number,
  offset: number
): Promise<TaskDto[]> => {
  try {
    const tasks = await dbCallWithSetTimeout(
      () => TaskDao.findAllTasks(limit, offset),
      0.5,
      300
    );

    if (!tasks.length) {
      return [];
    }

    return tasks.map((task) => transformTaskToDto(task));
  } catch (error) {
    throw new Error(`Get tasks failed: ${error}`);
  }
};
function transformTaskToDto(task: ITask): TaskDto {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
  };
}

export const simulate = async () => {
  const logTimestamp = (message) => {
    console.log(`${message}: ${new Date().toISOString()}`);
  };

  const getRandomIndex = (max) => Math.floor(Math.random() * max);

  logTimestamp('Test started');

  // Create 50 tasks
  const taskPromises = [];
  const taskIds = [];

  for (let i = 0; i < 50; i++) {
    taskPromises.push(
      axios.post(
        'http://localhost:3000/api/v1/tasks',
        {
          title: `Task ${i + 1}`,
          description: 'This is a task',
          status: TaskStatus.CREATED,
        },
        { timeout: 30000 } // Optional: 30-second timeout for the request
      )
    );
  }

  try {
    const createResponses = await Promise.all(taskPromises);

    createResponses.forEach((response) => {
      taskIds.push(response.data._id);
    });

    console.log('All tasks created.');

    return taskIds;
  } catch (error) {
    console.error('Create task failed:', error);
  }

  logTimestamp('50 Tasks created');

  // Randomly read a task
  logTimestamp('Random Read started');

  const readIndex = getRandomIndex(taskIds.length);
  try {
    const readResponse = await axios.get(
      `http://localhost:3000/api/v1/tasks/${taskIds[readIndex]}`,
      { timeout: 30000 }
    ); // 30 seconds);

    console.log('Read Task:', readResponse.data);
  } catch (error) {
    console.error('Read task failed:', error);
  }

  logTimestamp('Random Read ended');

  // Randomly update a task
  logTimestamp('Random Update started');

  const updateIndex = getRandomIndex(taskIds.length);

  try {
    const updateResponse = await axios.put(
      `http://localhost:3000/api/v1/tasks/${taskIds[updateIndex]}`,
      {
        title: 'Updated Task Title',
        description: 'Updated Task Description',
      },
      {
        timeout: 30000, // 30 seconds
      }
    );

    console.log('Updated Task:', updateResponse.data);
  } catch (error) {
    console.error('Update task failed:', error);
  }

  logTimestamp('Random Update ended');

  // Randomly delete a task
  logTimestamp('Random Delete started');

  const deleteIndex = getRandomIndex(taskIds.length);

  try {
    await axios.delete(
      `http://localhost:3000/api/v1/tasks/${taskIds[deleteIndex]}`,
      {
        timeout: 30000, // 30 seconds
      }
    );

    console.log(`Task with id ${taskIds[deleteIndex]} deleted successfully`);

    // Remove the deleted task ID from the array
    taskIds.splice(deleteIndex, 1);
  } catch (error) {
    console.error('Delete task failed:', error);
  }

  logTimestamp('Random Delete ended');

  logTimestamp('Test ended');
};

function dbCallWithSetTimeout(
  operation: () => Promise<any>,
  failRate: number = 0,
  ms: number = 500
): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (Math.random() < failRate) {
        reject(new Error('Simulated database failure'));
      } else {
        try {
          const result = await operation();

          resolve(result);
        } catch (error) {
          reject(error);
        }
      }
    }, 500); // 500ms
  });
}

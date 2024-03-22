import {
  createTask,
  deleteTask,
  getTasks,
  simulate,
  updateTask,
} from '../controllers/task';

import express from 'express';

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.put('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);
taskRouter.get('/simulate', simulate);

export default taskRouter;

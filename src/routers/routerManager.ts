import taskRouter from './task';

const routerManager = (app) => {
  app.use('/api/v1/tasks', taskRouter);
};

export default routerManager;

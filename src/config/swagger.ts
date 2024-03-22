import { taskApiSchema } from '../schemas/taskApi';
import { Options } from 'swagger-jsdoc';

import Task from '../schemas/taskSchema';

const combinePaths = (...apis: any[]) => {
  return apis.reduce((acc, api) => ({ ...acc, ...api }), {});
};

const swaggerDefinition: Options = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description:
      'This is a simple CRUD API application made with Express and documented with Swagger',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Developer',
      url: '',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
  ],
  paths: combinePaths(taskApiSchema),
  components: {
    schemas: {
      Task,
    },
  },
};

export default swaggerDefinition;

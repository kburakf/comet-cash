const Task = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'The unique identifier of the task',
    },
    title: {
      type: 'string',
      description: 'The title of the task',
    },
    description: {
      type: 'string',
      description: 'A detailed description of the task',
    },
    status: {
      type: 'string',
      description: 'The current status of the task',
    },
  },
  required: ['id', 'title', 'description', 'status'],
};

export default Task;

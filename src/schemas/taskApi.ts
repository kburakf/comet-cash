const tags = ['Task'];

export const taskApiSchema = {
  '/tasks': {
    get: {
      tags,
      summary: 'Get all tasks',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          schema: {
            type: 'integer',
            default: 10,
            description: 'Limit the number of tasks returned',
          },
        },
        {
          name: 'offset',
          in: 'query',
          schema: {
            type: 'integer',
            default: 0,
            description: 'Offset where to start returning tasks from',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successfully retrieved the list of tasks',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags,
      summary: 'Create a new task',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'description'],
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of the task',
                },
                description: {
                  type: 'string',
                  description: 'A detailed description of the task',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Successfully created a new task',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
            },
          },
        },
      },
    },
  },
  '/tasks/simulate': {
    get: {
      tags,
      summary: 'Simulate task operations',
      responses: {
        '200': {
          description: 'Successfully retrieved the list of tasks',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                // items: {
                //   $ref: '#/components/schemas/Task',
                // },
              },
            },
          },
        },
      },
    },
  },
  '/tasks/{taskId}': {
    put: {
      tags,
      summary: 'Update a task',
      parameters: [
        {
          name: 'taskId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'description'],
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of the task',
                },
                description: {
                  type: 'string',
                  description: 'A detailed description of the task',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Task updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Task',
              },
            },
          },
        },
        '404': {
          description: 'Task not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Task not found',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags,
      summary: 'Delete a task',
      parameters: [
        {
          name: 'taskId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Task deleted successfully',
        },
        '404': {
          description: 'Task not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Task not found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

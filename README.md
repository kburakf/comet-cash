# Task Management API

This project provides a simple CRUD (Create, Read, Update, Delete) API for task management, developed using Node.js and Express. It simulates database interactions and includes basic error handling to manage potential operation failures.

## Features

- CRUD operations for task management:
  - **Create**: Add a new task.
  - **Read**: Fetch all tasks.
  - **Update**: Update a task's status.
  - **Delete**: Remove a task.
- Task model with `id`, `title`, `description`, and `status` fields.
- Simulated asynchronous database calls using `setTimeout`.
- Basic validation middleware to ensure task titles are not empty.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/kburakf/comet-cash.git
    cd comet-cash
    ```

2.  Install the required npm packages:

    ```bash
    npm install
    ```

3.  Start the application:

    ```bash
    npm install
    ```

The API server will start, typically listening on port 3000.

### Using the API

The API supports the following endpoints:

- POST /tasks: Create a new task.
  Requires a JSON body with title, description.
- GET /tasks: Fetch a list of all tasks.
- PUT /tasks/:id: Update the specified task.
  Requires a JSON body with fields to update (title, description).
- DELETE /tasks/:id: Delete the specified task.

### Running with Docker

Use below command to run the project

```
docker-compose up --build -d
```

### Accessing the Application

- The application's file upload interface can be accessed at http://localhost:3000.
- API documentation and interactive exploration are available via Swagger at http://localhost:3000/docs.

## Testing

Our application comes with a comprehensive test suite to ensure all functionalities work as expected.

### Running the Tests

To run the tests, you can use the following command:

```bash
npm test
```

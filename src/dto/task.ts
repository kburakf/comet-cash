export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
}

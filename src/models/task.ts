import mongoose, { Schema, Document, ObjectId } from 'mongoose';

import { TaskStatus } from '../enums/status';

export interface ITask extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  status: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: TaskStatus,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;

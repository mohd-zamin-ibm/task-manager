import { model, Schema, Types } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export default interface Task {
  _id: Types.ObjectId;
  title: string;
  description: string;
  isCompleted: boolean;
  createdBy?: User;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Task>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    isCompleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: true,
      index: true,
    },
    dueDate: {
      type: Date,
      required: true,
      select: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: true,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: true,
    },
  },
  {
    versionKey: false,
  }
);

schema.index({ title: 'text', description: 'text' }, { weights: { title: 3, description: 1 } });
schema.index({ _id: 1, status: 1 });
schema.index({ taskUrl: 1, status: 1 });

export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME);

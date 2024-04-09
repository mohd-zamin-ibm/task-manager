import { model, Schema, Types } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
      select: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: true, // allows null
      trim: true,
      select: true,
    },
    password: {
      type: Schema.Types.String,
      select: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

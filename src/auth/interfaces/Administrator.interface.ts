import * as mongoose from 'mongoose';

export interface Administrator extends mongoose.Document {
  administratorId: string;
  password: string;
}

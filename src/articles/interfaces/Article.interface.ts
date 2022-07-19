import * as mongoose from 'mongoose';

export interface Article extends mongoose.Document {
  title: string;
  postDate: Date;
  content: string;
  editDate?: Date;
}

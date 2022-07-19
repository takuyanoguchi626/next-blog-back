import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  postDate: {
    type: Date,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  editDate: {
    type: Date,
  },
});

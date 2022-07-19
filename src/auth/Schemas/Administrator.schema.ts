import * as mongoose from 'mongoose';

export const AdministratorSchema = new mongoose.Schema({
  administratorId: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

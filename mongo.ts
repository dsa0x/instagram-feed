import * as mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.mongoDbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));

export const dbStart = (cb: any) => {
  db.once('open', () => {
    console.log('Mongodb connected');
    cb;
  });
};

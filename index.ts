import { dbStart } from './mongo';
import express from 'express';
import config from './config';
import router from './router';
import Controller from './controller';
var process = require('process');
// import app fr

const app = express();

app.use(router);

dbStart(() => {
  console.log('hi');
});

// setInterval(() => {
//   Controller.getAutoOrders()
//     .then(() => {
//       console.log('Fetched users posts');
//     })
//     .catch(() => {
//       console.log('Error fetching users posts');
//     });
// }, 300000);

app.listen(config.port, () => {
  console.log(`server running on port : ${config.port}`);

  process.on('SIGINT', () => {
    console.info('Interrupted');
    process.exit(0);
  });
});

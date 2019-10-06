import dotenv from 'dotenv';
import Client from '../config/index';

import { tables } from './tableQueries';
import { data } from './data';

dotenv.config();
Client.connect();
// Run table queries
export const createTables = () => {
  Client.query(tables)
    .then()
    .catch();
  Client.query(data)
    .then(() => {
      Client.end();
    })
    .catch();
};

// Delete them
export const tearDown = () => {
  const deleteQuery = 'DROP TABLE IF EXISTS users, articles, comments, flags CASCADE';

  Client.query(deleteQuery)
    .then(() => {
      Client.end();
    })
    .catch();
};
require('make-runnable');

import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

if (process.env.NODE_ENV === 'testing') {
  module.exports = new Client({ connectionString: process.env.DB_TEST });
} else {
  module.exports = new Client({ connectionString: process.env.DATABASE_URL });
}

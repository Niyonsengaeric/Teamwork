import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

module.exports = new Client({ connectionString: process.env.DATABASE_URL });

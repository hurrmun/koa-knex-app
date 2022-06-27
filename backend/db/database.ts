import { config } from 'dotenv';
import knexfile from './knexfile';
import knex from 'knex';
config();

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = knexfile[environment];
const database = knex(environmentConfig);

export default database;

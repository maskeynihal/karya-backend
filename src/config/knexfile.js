require('dotenv').config({ path: '../../.env' });

// Default configuration for database connection
export const connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
  timezone: 'UTC'
};
console.log(process.env.DB_PORT);
export const client = process.env.DB_CLIENT;

export const migrations = {
  tableName: 'migrations',
  directory: '../database/migrations',
  stub: '../stubs/migration.stub'
};

export const seeds = {
  directory: '../database/seed',
  stub: '../stubs/seed.stub'
};

import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
  host: process.env['MONGO_DB_HOST'],
  port: process.env['MONGO_DB_PORT'],
  username: process.env['MONGO_DB_USERNAME'],
  password: process.env['MONGO_DB_PASSWORD'],
  database: process.env['MONGO_DB_DATABASE'],
}));

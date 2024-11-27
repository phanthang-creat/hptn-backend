import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env['MARIADB_TYPE'],
  host: process.env['MARIADB_HOST'],
  port: parseInt(process.env['MARIADB_PORT'] as string, 10),
  username: process.env['MARIADB_USERNAME'],
  password: process.env['MARIADB_PASSWORD'],
  database: process.env['MARIADB_DATABASE'],
  // synchronize: process.env.MARIADB_SYNCHRONIZE,
  logging: process.env['MARIADB_LOGGING'],
  entities: [],
  migrations: [],
  // subscribers: [
  //     process.env.MARIADB_SUBSCRIBERS
  // ],
}));

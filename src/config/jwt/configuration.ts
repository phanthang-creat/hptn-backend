import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessTokenPublicKey: process.env['JWT_ACCESS_TOKEN_PUBLIC_KEY'],
  accessTokenExpiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'],
  accessTokenPrivateKey: process.env['JWT_ACCESS_TOKEN_PRIVATE_KEY'],
}));

import { registerAs } from '@nestjs/config';

/**
 * Aws configuration service
 */

export default registerAs('multer', () => ({
  dest: process.env['MULTER_DEST'],
}));

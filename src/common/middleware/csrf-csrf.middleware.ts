import { doubleCsrf, DoubleCsrfConfigOptions } from 'csrf-csrf';
import { NextFunction, Request, Response } from 'express';

const options: DoubleCsrfConfigOptions = {
  getSecret: () => 'secret',
  cookieName: 'csrf-token',
  cookieOptions: {
    sameSite: 'strict',
    secure: true,
    path: '/',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => {
    return req.headers['x-csrf-token'] as string;
  },
};

const csrfMiddleware = doubleCsrf(options);

export const CSRFMidlleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (csrfMiddleware.validateRequest(req)) {
    const token = csrfMiddleware.generateToken(req, res);

    res.cookie(
      options.cookieName ?? 'csrf-token',
      token,
      options.cookieOptions ?? {
        sameSite: 'strict',
        secure: true,
        path: '/',
      },
    );

    res.header('csrf-token', token);

    return next();
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: 'Invalid CSRF Token',
      error: 'Forbidden',
    });
  }
};

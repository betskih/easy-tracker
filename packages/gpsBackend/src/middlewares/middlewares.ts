import winston from 'winston';
import path from 'path';
import dayjs from 'dayjs';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';

const { printf } = winston.format;
const myFormat = printf(
  ({
    level, message, label, params,
  }) => `${dayjs().format()} [${label}] ${level}: ${message} ${params}`,
);

export const logger = winston.createLogger({
  level: 'error',
  format: myFormat,
  defaultMeta: { service: 'gpsLocator' },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../log/error.log'),
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
});

// eslint-disable-next-line no-unused-vars
export const errorLoggerMiddleware = (err, req, res, next) => {
  const msg = 'Unknown server error';
  logger.log({
    level: 'error',
    message: msg,
    label: 'ErrorHandler',
    params: { err },
  });
  res.status(500).jsend.error({ message: msg });
};

const checkToken = (excludeRoutes: string[] = [], isRefresh = false) => (req, res, next) => {
  if (excludeRoutes.includes(req.originalUrl)) {
    return next();
  }
  const authHeader = get(req, 'headers.authorization', ' ');
  const [header, token] = authHeader.split(' ');
  const message = 'Authorization required';
  if (!token || header !== 'Bearer') {
    logger.log({
      level: 'error',
      message,
      label: 'checkToken',
      params: '',
    });
    return res.status(401).jsend.error({
      message,
    });
  }
  const SECRET_KEY = process.env.SecretKey;
  return jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (
      err
      || (decoded.type === 'base' && isRefresh)
      || (decoded.type === 'refresh' && !isRefresh)
    ) {
      const authMessage = 'Failed to authenticate token.';
      logger.log({
        level: 'error',
        message: authMessage,
        label: 'checkToken',
        params: '',
      });
      return res.status(403).jsend.error({
        message: authMessage,
      });
    }
    req.tokenId = decoded.id;
    return next();
  });
};
export default checkToken;

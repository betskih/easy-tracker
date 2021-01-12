import express from 'express';
import jsend from 'jsend';
import morgan from 'morgan';
import fs from 'fs';
import cors from 'cors';
import router from './routers/routers';
import login from './routers/login';
import { errorLoggerMiddleware, logger } from './middlewares/middlewares';
import sequelize from './models/dbTypes';
import webRouter from './routers/web_router';

const accessLog = fs.createWriteStream('log/access.log', { flags: 'a' });

const app = express();

app.use(jsend.middleware);
app.use(cors());

app.use(morgan('combined', { stream: accessLog }));
app.use(errorLoggerMiddleware);

app.use('/api/', router);
app.use('/login/', login);
app.use('/web/', webRouter);
const appPort = parseInt(process.env.PROCESS_PORT ? process.env.PROCESS_PORT : '0', 10);
sequelize.sync();

app.listen(appPort, '0.0.0.0', () => {
  console.log(`API - listening on port ${appPort}...`);
});

process.on('uncaughtException', (err) => {
  logger.log({
    level: 'error',
    message: `uncaughtException: ${err}`,
    label: 'process',
    params: {},
  });
  process.exit(1);
});

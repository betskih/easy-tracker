import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dayjs = require('dayjs');
import { userLoginSchema, Users } from '../models/UserTypes';
import { logger } from '../middlewares/middlewares';
import login from '../routers/login';

const getNewGeoId = async () => {
  const part1 = Math.random();
  const part2 = Math.random();
  const id = `${Math.trunc(part1 * 10000)}${Math.trunc(part2 * 100000)}`.padStart(9, '0');
  const count = await Users.count({ where: { geoId: id } });
  if (count === 0) {
    return id;
  }
  return getNewGeoId();
};

const userLogin = async (req, res) => {
  const validation = userLoginSchema.validate(req.body);
  if (validation.error) {
    const message = 'Validation Error!';
    logger.log({
      level: 'error',
      message,
      label: 'login',
      params: JSON.stringify({ ...req.body }),
    });
    res.status(400).jsend.error({
      message,
    });
    return;
  }
  const SECRET_KEY = process.env.SecretKey;
  const { deviceId } = req.body;
  const existedDevice = await Users.findAll({ where: { deviceId } });
  let user = get(existedDevice, '0.dataValues', null);
  if (!user) {
    const today = dayjs().valueOf();
    const geoId = await getNewGeoId();
    const newUser = {
      id: uuidv4(),
      deviceId,
      password: '',
      geoId,
      blocked: false,
      lastLogin: today,
      creationDate: today,
    };
    const dbResult = await Users.create(newUser);
    const createdUser = get(dbResult, 'dataValues', null);
    if (newUser.id !== createdUser.id) {
      res.status(500).jsend.error({
        message: 'DB server error',
      });
      return;
    }
    user = newUser;
  } else {
    user.lastLogin = dayjs().valueOf();
    const DbResult = await Users.update(user, { where: { id: user.id } });
    const rowsAffected = get(DbResult, '0', null);
    if (rowsAffected === 0) {
      res.status(500).jsend.error({ message: 'Unknown server error' });
      return;
    }
  }
  const token = jwt.sign({ id: user.id, type: 'base' }, SECRET_KEY, { expiresIn: process.env.tokenExpiresIn });
  const refreshToken = jwt.sign({ id: user.id, type: 'refresh' }, SECRET_KEY, { expiresIn: process.env.refreshTokenExpiresIn });
  res.status(201).jsend.success({
    id: user.id,
    token,
    refreshToken,
  });
};

export default userLogin;

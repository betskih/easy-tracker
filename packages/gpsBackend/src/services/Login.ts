import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import dayjs = require('dayjs');
import { Users } from '../models/UserTypes';

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

const userLogin = async (req, res, next) => {
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
      res.response = {
        status: 500,
        message: 'DB server error',
      };
      next();
    }
    user = newUser;
  } else {
    user.lastLogin = dayjs().valueOf();
    const DbResult = await Users.update(user, { where: { id: user.id } });
    const rowsAffected = get(DbResult, '0', null);
    if (rowsAffected === 0) {
      res.response = {
        status: 500,
        message: 'Unknown server error',
      };
      next();
    }
  }
  const token = jwt.sign({ id: user.id, type: 'base' }, SECRET_KEY, { expiresIn: process.env.tokenExpiresIn });
  const refreshToken = jwt.sign({ id: user.id, type: 'refresh' }, SECRET_KEY, { expiresIn: process.env.refreshTokenExpiresIn });
  res.response = {
    status: 201,
    data: {
      id: user.id,
      token,
      refreshToken,
    },
  };
  next();
};

export default userLogin;

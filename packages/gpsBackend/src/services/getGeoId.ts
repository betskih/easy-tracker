import { get } from 'lodash';
import { Users } from '../models/UserTypes';
import { logger } from '../middlewares/middlewares';

const getGeoId = async (req, res, next) => {
  const { id } = req.params;
  const dbResponse = await Users.findAll({ where: { id } });
  const user = get(dbResponse, '0.dataValues', null);
  if (user) {
    res.response = {
      status: 200,
      data: { geoId: user.geoId, passwordSet: user.password.length > 0 },
    };
  } else {
    const msg = 'User not found!';
    res.response = {
      status: 404,
      message: msg,
    };
    logger.log({
      level: 'error',
      message: msg,
      label: 'getGeoId',
      params: id,
    });
  }
  next();
};
export default getGeoId;

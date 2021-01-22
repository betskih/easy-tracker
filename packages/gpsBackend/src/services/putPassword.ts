import { get } from 'lodash';
import { logger } from '../middlewares/middlewares';
import { Users } from '../models/UserTypes';

const putPassword = async (req, res, next) => {
  const geoId = get(req, 'body.geoId', '');
  const id = req.tokenId;
  const password = get(req, 'body.password', '');
  const dbResponse = await Users.update({ password }, { where: { geoId, id } });
  const response = get(dbResponse, '0', 0);
  if (response !== 1) {
    const message = 'Change password error';
    res.response = {
      status: 500,
      message,
    };
    logger.log({
      level: 'error',
      message,
      label: 'putPassword',
      params: JSON.stringify({ geoId }),
    });
    next();
  }
  res.response = {
    status: 200,
    data: { geoId },
  };
  next();
};
export default putPassword;

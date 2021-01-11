import { get } from 'lodash';
import { getGeoSchema, Users } from '../models/UserTypes';
import { logger } from '../middlewares/middlewares';

const getGeoId = async (req, res) => {
  const id = req.params.id.toString();
  const validation = getGeoSchema.validate({ id });
  if (validation.error || req.tokenId !== id) {
    const message = 'Validation Error!';
    logger.log({
      level: 'error',
      message,
      label: 'getGeoId',
      params: JSON.stringify({ id, tokenId: req.tokenId }),
    });
    res.status(400).jsend.error({
      message,
    });
    return;
  }
  const dbResponse = await Users.findAll({ where: { id } });
  const user = get(dbResponse, '0.dataValues', null);
  if (user) {
    res.jsend.success({ geoId: user.geoId, passwordSet: user.password.length > 0 });
  } else {
    const msg = 'User not found!';
    res.status(404).jsend.error({ message: msg });
    logger.log({
      level: 'error',
      message: msg,
      label: 'getGeoId',
      params: id,
    });
  }
};
export default getGeoId;

import { putPasswordSchema } from '../models/GeoTypes';
import { get } from 'lodash';
import { logger } from '../middlewares/middlewares';
import { Users } from '../models/UserTypes';

const putPassword = async (req, res) => {
  const validation = putPasswordSchema.validate(req.body);
  const geoId = get(req, 'body.geoId', '');
  if (validation.error || req.tokenId !== geoId) {
    const { message } = validation.error;
    logger.log({
      level: 'error',
      message,
      label: 'putPassword',
      params: JSON.stringify({ geoId }),
    });
    res.status(400).jsend.error({
      message,
    });
    return;
  }
  const password = get(req, 'body.password', '');
  const dbResponse = await Users.update({ password }, { where: { geoId } });
  const response = get(dbResponse, '0', 0);
  if (response !== 1) {
    const message = 'Change password error';
    logger.log({
      level: 'error',
      message,
      label: 'putPassword',
      params: JSON.stringify({ geoId }),
    });
    res.status(500).jsend.error({
      message,
    });
  }
  res.status(200).jsend.success({ geoId });
};
export default putPassword;

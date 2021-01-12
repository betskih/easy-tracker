import { get } from 'lodash';
import { GeoData, GeoDataDto, postGeoDataSchema } from '../models/GeoTypes';
import { logger } from '../middlewares/middlewares';
import { Users } from '../models/UserTypes';
import sequelize from '../models/dbTypes';

const postGeoData = async (req, res) => {
  const validation = postGeoDataSchema.validate(req.body);
  const geoId = get(req, 'body.geoId', '');
  if (validation.error) {
    const { message } = validation.error;
    logger.log({
      level: 'error',
      message,
      label: 'postGeoData',
      params: JSON.stringify({ geoId }),
    });
    res.status(400).jsend.error({
      message,
    });
    return;
  }

  const dbResponse = await Users.findAll({ where: { id: req.tokenId } });
  const userGeoId = get(dbResponse, '0.dataValues.geoId', null);
  if (userGeoId !== geoId) {
    const authMessage = 'GeoId and token id mismatch.';
    logger.log({
      level: 'error',
      message: authMessage,
      label: 'postGeoData',
      params: JSON.stringify({ geoId }),
    });
    res.status(403).jsend.error({
      message: authMessage,
    });
  }

  const records: GeoDataDto[] = req.body.data.map((item) => ({
    geoId,
    timestamp: item.timestamp,
    accuracy: item.coords.accuracy,
    altitude: item.coords.altitude,
    heading: item.coords.heading,
    latitude: item.coords.latitude,
    longitude: item.coords.longitude,
    speed: item.coords.speed,
  }));

  try {
    sequelize.transaction((t1) => {
      t1.afterCommit(() => {
        res.status(200).jsend.success({ inserted: records.length });
      });
      return GeoData.bulkCreate(records, { transaction: t1 });
    });
  } catch (e) {
    const msg = 'Insert records error';
    logger.log({
      level: 'error',
      message: msg,
      label: 'postGeoData',
      params: JSON.stringify({ geoId }),
    });
    res.status(500).jsend.error({ message: msg });
  }
};
export default postGeoData;

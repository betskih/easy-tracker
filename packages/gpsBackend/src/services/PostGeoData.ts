import { get } from 'lodash';
import { GeoData, GeoDataDto } from '../models/GeoTypes';
import { logger } from '../middlewares/middlewares';
import { Users } from '../models/UserTypes';
import sequelize from '../models/dbTypes';

const postGeoData = async (req, res, next) => {
  const geoId = get(req, 'body.geoId', '');
  const dbResponse = await Users.findAll({ where: { id: req.tokenId } });
  const userGeoId = get(dbResponse, '0.dataValues.geoId', null);
  if (userGeoId !== geoId) {
    const authMessage = 'GeoId and token id mismatch.';
    res.response = {
      status: 403,
      message: authMessage,
    };

    logger.log({
      level: 'error',
      message: authMessage,
      label: 'postGeoData',
      params: JSON.stringify({ geoId }),
    });
    next();
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
        res.response = {
          status: 200,
          data: { inserted: records.length },
        };
        next();
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
    res.response = {
      status: 500,
      message: msg,
    };
    next();
  }
};
export default postGeoData;

import { Op } from 'sequelize';
import { get } from 'lodash';
import { postGeoTrackSchema } from '../models/TrackTypes';
import { logger } from '../middlewares/middlewares';
import { GeoData } from '../models/GeoTypes';

const geoTrack = async (req, res) => {
  const validation = postGeoTrackSchema.validate(req.body);
  const { geoId, startDate, endDate } = req.body;
  if (validation.error) {
    const { message } = validation.error;
    logger.log({
      level: 'error',
      message,
      label: 'geoTrack',
      params: JSON.stringify({ geoId, startDate, endDate }),
    });
    res.status(400).jsend.error({
      message,
    });
  }

  const dbResponse = await GeoData.findAll({
    attributes: ['timestamp', 'accuracy', 'altitude', 'heading', 'latitude', 'longitude', 'speed'],
    where: {
      geoId,
      timestamp: { [Op.between]: [startDate, endDate] },
    },
    order: ['timestamp'],
  });
  const track: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
    timestamp: number;
  }[] = dbResponse.map((item) => {
    const value = get(item, 'dataValues');
    return { ...value, timestamp: parseInt(value.timestamp, 10) };
  });
  res.jsend.success({ geoId, track });
};
export default geoTrack;

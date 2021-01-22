import { Op } from 'sequelize';
import { get } from 'lodash';
import { GeoData } from '../models/GeoTypes';

const geoTrack = async (req, res, next) => {
  const { geoId, startDate, endDate } = req.body;
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
  res.response = {
    status: 200,
    data: { geoId, track },
  };
  next();
};
export default geoTrack;

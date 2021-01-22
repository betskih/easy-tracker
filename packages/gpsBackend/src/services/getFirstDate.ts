import { GeoData } from '../models/GeoTypes';

const getFirstDate = async (req, res, next) => {
  const geoId = req.params.geoid.toString();
  const firstRecordDate = await GeoData.min('timestamp', {
    where: {
      geoId,
    },
  });
  res.response = {
    status: 200,
    data: { geoId, firstRecordDate: firstRecordDate || 0 },
  };
  next();
};
export default getFirstDate;

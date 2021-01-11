import { getFirstDateValidationSchema } from '../models/TrackTypes';
import { logger } from '../middlewares/middlewares';
import { GeoData } from '../models/GeoTypes';

const getFirstDate = async (req, res) => {
  const geoId = req.params.id.toString();
  const validation = getFirstDateValidationSchema.validate(geoId);
  if (validation.error) {
    const { message } = validation.error;
    logger.log({
      level: 'error',
      message,
      label: 'getFirstDate',
      params: JSON.stringify({ geoId }),
    });
    res.status(400).jsend.error({
      message,
    });
  }
  const firstRecordDate = await GeoData.min('timestamp', {
    where: {
      geoId,
    },
  });
  res.jsend.success({ geoId, firstRecordDate: firstRecordDate || 0 });
};
export default getFirstDate;

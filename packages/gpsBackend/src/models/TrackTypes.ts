import Joi from 'joi';

export const postGeoTrackSchema = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  startDate: Joi.number().min(1607000000000).integer().required(),
  endDate: Joi.number().min(1607000000000).integer().required(),
  password: Joi.string(),
});

export const getFirstDateValidationSchema = Joi.string().min(9).max(9).required();

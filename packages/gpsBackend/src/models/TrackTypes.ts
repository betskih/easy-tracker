import Joi from 'joi';

export const postGeoTrackSchema = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  startDate: Joi.number().min(1607000000000).integer().required(),
  endDate: Joi.number().min(1607000000000).integer().required(),
  password: Joi.string().allow('').min(0).max(60),
});

export const getFirstDateValidationSchema = Joi.object().keys({
  geoid: Joi.string().min(9).max(9).required(),
});

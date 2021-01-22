import Joi from 'joi';

export const getGeoIdSchemaDTO = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  passwordSet: Joi.boolean().required(),
});

export const postGeoDataSchemaDTO = Joi.object().keys({
  inserted: Joi.number().required(),
});

export const putPasswordSchemaDTO = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
});

export const userLoginSchemaDTO = Joi.object().keys({
  id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
  token: Joi.string().required(),
  refreshToken: Joi.string().required(),
});

export const postGeoTrackSchemaDTO = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  track: Joi.array()
    .items(
      Joi.object().keys({
        timestamp: Joi.number(),
        accuracy: Joi.number(),
        altitude: Joi.number(),
        heading: Joi.number(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        speed: Joi.number(),
      }),
    )
    .required(),
});

export const getFirstDateSchemaDTO = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  firstRecordDate: Joi.number().min(1607000000000).integer().required(),
});

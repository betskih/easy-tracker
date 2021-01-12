import { DataTypes, Model } from 'sequelize';
import Joi from 'joi';
import sequelize from './dbTypes';
import { MobileUser, Users } from './UserTypes';

export interface GeoDataDto extends Model {
  geoId: string;
  timestamp: number;
  accuracy: number;
  altitude: number;
  heading: number;
  latitude: number;
  longitude: number;
  altitudeAccuracy: number;
  speed: number;
}

const coords = Joi.object()
  .keys({
    accuracy: Joi.number(),
    altitude: Joi.number(),
    heading: Joi.number(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    altitudeAccuracy: Joi.number(),
    speed: Joi.number(),
  })
  .required();

export const postGeoDataSchema = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  data: Joi.array()
    .items(
      Joi.object({
        timestamp: Joi.number().min(1607000000000).integer().required(),
        coords,
      }),
    )
    .required(),
});

export const putPasswordSchema = Joi.object().keys({
  geoId: Joi.string().min(9).max(9).required(),
  password: Joi.string().min(0).max(60).required(),
});

export const GeoData = sequelize.define<MobileUser>(
  'geodata',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    geoId: {
      type: DataTypes.STRING(9),
      references: {
        model: Users,
        key: 'geoId',
      },
    },
    timestamp: DataTypes.BIGINT,
    accuracy: DataTypes.DOUBLE,
    altitude: DataTypes.DOUBLE,
    heading: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    altitudeAccuracy: DataTypes.DOUBLE,
    speed: DataTypes.DOUBLE,
  },
  {
    timestamps: false,
  },
);

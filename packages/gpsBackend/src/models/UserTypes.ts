import Joi from 'joi';
import { DataTypes, Model } from 'sequelize';
import sequelize from './dbTypes';

export interface MobileUser extends Model {
  id: string;
  deviceId: string;
  password: string;
  geoId: string;
  blocked: boolean;
  lastLogin: number;
  creationDate: number;
}

export const userLoginSchema = Joi.object().keys({
  deviceId: Joi.string().min(10).max(100).required(),
});

export const getGeoSchema = Joi.object().keys({
  id: Joi.string()
    .guid({
      version: ['uuidv4'],
    })
    .required(),
});

export const Users = sequelize.define<MobileUser>(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    deviceId: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    geoId: { type: DataTypes.STRING(9), unique: true },
    password: { type: DataTypes.STRING(100) },
    blocked: { type: DataTypes.BOOLEAN },
    lastLogin: { type: DataTypes.BIGINT },
    creationDate: { type: DataTypes.BIGINT },
  },
  {
    timestamps: false,
  },
);

import { Sequelize } from 'sequelize';
import { get } from 'lodash';

const CONNECTION_STRING = get(process, 'env.CONNECTION_STRING', '');
const maxPool = process.env.MaxPoolConnections;
export const sequelize = new Sequelize(CONNECTION_STRING, {
  pool: {
    max: parseInt(maxPool || '1', 10),
    min: 1,
  },
});

import { get } from 'lodash';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const LOCAL_ZONE = 'ru';

export const GEO_ID_LENGTH = 9;
const rus: { [key: string]: string } = {
  inputGeoId: 'Введите Locator ID',
  Add: 'Добавить',
  mon_01: 'января',
  mon_02: 'февраля',
  mon_03: 'марта',
  mon_04: 'апреля',
  mon_05: 'мая',
  mon_06: 'июня',
  mon_07: 'июля',
  mon_08: 'августа',
  mon_09: 'сентября',
  mon_10: 'октября',
  mon_11: 'ноября',
  mon_12: 'декабря',
  km: 'км',
  m: 'м',
};

export const getText = (id: string) => {
  return get(rus, id, '');
};

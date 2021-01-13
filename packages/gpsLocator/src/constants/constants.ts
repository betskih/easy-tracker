import { get } from 'lodash';

export const OS_ANDROID = 'android';

export const LOCAL_ZONE = 'ru';
export const GEO_ID_LENGTH = 9;

const rus: { [key: string]: string } = {
  pressToShow: 'Нажмите, чтобы показать ID',
  startLog: 'Старт записи',
  endLog: 'Остановить запись',
};

export const getText = (id: string) => {
  return get(rus, id, '');
};

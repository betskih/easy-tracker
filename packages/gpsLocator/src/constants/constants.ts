import { get } from 'lodash';

export const OS_ANDROID = 'android';

export const LOCAL_ZONE = 'ru';
export const GEO_ID_LENGTH = 9;

const rus: { [key: string]: string } = {
  pressToShow: 'Нажмите, чтобы показать ID',
  startLog: 'Старт записи',
  endLog: 'Остановить запись',
  yourId: 'Ваш ID',
  noInfo: 'Информация\nнедоступна',
  close: 'Закрыть',
  setPassword: 'Установить пароль',
  changePassword: 'Изменить пароль',
  newPassword: 'Новый пароль',
  repeatPassword: 'Повтор пароля',
  reset: 'Сбросить',
  change: 'Изменить',
};

export const getText = (id: string) => {
  return get(rus, id, '');
};

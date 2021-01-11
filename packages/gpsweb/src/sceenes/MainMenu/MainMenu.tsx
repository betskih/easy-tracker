import React, { FunctionComponent, useCallback, useState } from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import './MainMenu.scss';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import dayjs from 'dayjs';
import { get } from 'lodash';
import ru from 'date-fns/locale/ru';
import { GeoInput } from '../components/GeoInput/GeoInput';
import {
  addGeoIdAction,
  openCloseGeoId,
  setEndDateAction, setMapViewParams,
  setStartDateAction,
} from '../../services/geoIds/actions';
import { getGeoIdsSelector } from '../../services/geoIds/selector';
import { DATE_FORMAT, LOCAL_ZONE } from '../../Constants/constants';
import 'react-datepicker/dist/react-datepicker.css';
import { TrackList } from '../components/TrackList/TrackList';

// dayjs.extend(utc);
// dayjs.extend(timezone);
registerLocale('ru', ru);

interface IMainMenuProps {}

export const MainMenu: FunctionComponent<IMainMenuProps> = () => {
  const [isModal, showModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dispatch = useDispatch();
  const ids = useSelector(getGeoIdsSelector);
  const addGeoId = useCallback(() => {
    showModal(true);
  }, []);

  const onClose = useCallback(() => {
    showModal(false);
  }, []);

  const onAdd = useCallback(
    (geoId: string) => {
      dispatch(addGeoIdAction(geoId));
      onClose();
    },
    [dispatch, onClose],
  );

  const onAccordionClick = useCallback(
    (e, props) => {
      const { index } = props;
      const geoId = get(ids, `${index}.id`);
      const isOpened = get(ids, `${index}.isOpened`);
      dispatch(openCloseGeoId({ geoId, isOpened }));
    },
    [ids, dispatch],
  );

  const onSetStartDate = useCallback(
    (date) => {
      setStartDate(date);
      dispatch(setStartDateAction(dayjs(date).startOf('day').valueOf()));
    },
    [dispatch],
  );
  const onSetEndDate = useCallback(
    (date) => {
      setEndDate(date);
      dispatch(setEndDateAction(dayjs(date).endOf('day').valueOf()));
    },
    [dispatch],
  );

  const onTrackPress = useCallback((geoId)=>(index: number) => {
    dispatch(setMapViewParams({ geoId, index}));
  }, [dispatch]);

  return (
    <div className={'container'}>
      <Button circular primary icon="plus" onClick={addGeoId} />
      {isModal && <GeoInput onClose={onClose} onAdd={onAdd} />}
      <div className={'calendar'}>
        <DatePicker
          locale={LOCAL_ZONE}
          dateFormat={DATE_FORMAT}
          selected={startDate}
          onChange={onSetStartDate}
          maxDate={endDate}
        />
        <DatePicker
          locale={LOCAL_ZONE}
          dateFormat={DATE_FORMAT}
          selected={endDate}
          onChange={onSetEndDate}
          minDate={startDate}
        />
      </div>

      <Accordion>
        {ids.map((item, index) => (
          <div key={index}>
            <Accordion.Title
              index={index}
              key={item.id}
              onClick={onAccordionClick}
              active={item.isOpened}
            >
              <Icon name="dropdown" />
              <span>{item.id}</span>
            </Accordion.Title>
            <TrackList isOpened={item.isOpened} geoId={item.id} onPress={onTrackPress(item.id)} />
          </div>
        ))}
      </Accordion>
    </div>
  );
};
